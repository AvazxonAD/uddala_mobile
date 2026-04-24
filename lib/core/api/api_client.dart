import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config.dart';
import '../storage/token_storage.dart';

class ApiException implements Exception {
  ApiException(this.message, {this.statusCode, this.errors});

  final String message;
  final int? statusCode;
  final Map<String, dynamic>? errors;

  @override
  String toString() => 'ApiException($statusCode): $message';
}

typedef UnauthorizedCallback = Future<void> Function();

class ApiClient {
  ApiClient._();
  static final ApiClient instance = ApiClient._();

  final _http = http.Client();
  Future<bool>? _refreshing;
  UnauthorizedCallback? onUnauthorized;

  Uri _uri(String path, [Map<String, dynamic>? query]) {
    final base = Uri.parse(AppConfig.baseUrl);
    return base.replace(
      path: path.startsWith('/') ? path : '/$path',
      queryParameters: query?.map((k, v) => MapEntry(k, v.toString())),
    );
  }

  Future<Map<String, String>> _headers({bool auth = false}) async {
    final headers = <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-app-lang': AppConfig.appLang,
    };
    if (auth) {
      final token = await TokenStorage.read();
      if (token != null) headers['Authorization'] = 'Bearer $token';
    }
    return headers;
  }

  Future<dynamic> get(String path, {Map<String, dynamic>? query, bool auth = false}) async {
    return _send(() async {
      final res = await _http.get(_uri(path, query), headers: await _headers(auth: auth));
      return res;
    }, auth: auth);
  }

  Future<dynamic> post(String path, {Object? body, bool auth = false}) async {
    return _send(() async {
      final res = await _http.post(
        _uri(path),
        headers: await _headers(auth: auth),
        body: body == null ? null : jsonEncode(body),
      );
      return res;
    }, auth: auth);
  }

  Future<dynamic> patch(String path, {Object? body, bool auth = false}) async {
    return _send(() async {
      final res = await _http.patch(
        _uri(path),
        headers: await _headers(auth: auth),
        body: body == null ? null : jsonEncode(body),
      );
      return res;
    }, auth: auth);
  }

  Future<dynamic> _send(Future<http.Response> Function() request, {required bool auth}) async {
    final res = await request();
    if (res.statusCode == 401 && auth) {
      final refreshed = await _tryRefresh();
      if (refreshed) {
        final retry = await request();
        return _handle(retry);
      }
      await TokenStorage.clear();
      final cb = onUnauthorized;
      if (cb != null) await cb();
    }
    return _handle(res);
  }

  Future<bool> _tryRefresh() {
    return _refreshing ??= _doRefresh().whenComplete(() => _refreshing = null);
  }

  Future<bool> _doRefresh() async {
    final refresh = await TokenStorage.readRefresh();
    if (refresh == null || refresh.isEmpty) return false;
    try {
      final res = await _http.post(
        _uri('/client/auth/refresh'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-app-lang': AppConfig.appLang,
        },
        body: jsonEncode({'refresh_token': refresh}),
      );
      if (res.statusCode < 200 || res.statusCode >= 300) return false;
      final body = res.body.isEmpty ? const {} : jsonDecode(res.body);
      final data = (body is Map && body['data'] is Map) ? body['data'] as Map : const {};
      final token = data['access_token'];
      if (token is! String || token.isEmpty) return false;
      await TokenStorage.save(token);
      return true;
    } catch (_) {
      return false;
    }
  }

  dynamic _handle(http.Response res) {
    final body = res.body.isEmpty ? <String, dynamic>{} : jsonDecode(res.body);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return body;
    }
    final message = body is Map && body['message'] is String
        ? body['message'] as String
        : 'Xatolik yuz berdi (${res.statusCode})';
    final errors = body is Map && body['errors'] is Map
        ? Map<String, dynamic>.from(body['errors'] as Map)
        : null;
    throw ApiException(message, statusCode: res.statusCode, errors: errors);
  }
}
