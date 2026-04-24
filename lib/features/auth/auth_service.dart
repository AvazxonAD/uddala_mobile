import 'dart:async';

import '../../core/api/api_client.dart';
import '../../core/storage/token_storage.dart';
import '../location/location_service.dart';

class AuthService {
  AuthService._();
  static final AuthService instance = AuthService._();

  final _api = ApiClient.instance;

  Future<void> login({required String phone}) async {
    await _api.post('/client/auth/login', body: {'phone': phone});
  }

  Future<void> verify({required String phone, required String code}) async {
    final res = await _api.post(
      '/client/auth/verify',
      body: {'phone': phone, 'code': code},
    );
    final data = (res is Map && res['data'] is Map) ? res['data'] as Map : const {};
    final token = data['access_token'];
    if (token is! String || token.isEmpty) {
      throw ApiException('Token olinmadi', statusCode: 500);
    }
    await TokenStorage.save(token);
    final refresh = data['refresh_token'];
    if (refresh is String && refresh.isNotEmpty) {
      await TokenStorage.saveRefresh(refresh);
    }
    unawaited(_syncLocationIfEmpty());
  }

  Future<void> _syncLocationIfEmpty() async {
    try {
      final profile = await me();
      if (profile['region_id'] != null || profile['district_id'] != null) {
        unawaited(LocationService.instance.detectAndResolve(force: true));
        return;
      }
      final result = await LocationService.instance.detectAndResolve(force: true);
      final loc = result.location;
      final regionId = loc?.regionId;
      if (regionId == null) return;
      await _api.patch(
        '/client/auth/location',
        body: {
          'region_id': regionId,
          'district_id': loc?.districtId,
        },
        auth: true,
      );
    } catch (_) {}
  }

  Future<Map<String, dynamic>> me() async {
    final res = await _api.get('/client/auth/me', auth: true);
    final data = (res is Map && res['data'] is Map) ? res['data'] as Map : const {};
    return Map<String, dynamic>.from(data);
  }

  Future<void> logout() async {
    try {
      final refresh = await TokenStorage.readRefresh();
      await _api.post(
        '/client/auth/logout',
        body: refresh != null ? {'refresh_token': refresh} : null,
      );
    } catch (_) {
    }
    await TokenStorage.clear();
    await LocationService.instance.clear();
  }
}
