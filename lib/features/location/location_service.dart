import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/api/api_client.dart';

class UserLocation {
  const UserLocation({
    this.regionId,
    this.regionName,
    this.districtId,
    this.districtName,
    this.displayName,
    this.lat,
    this.lng,
  });

  final int? regionId;
  final String? regionName;
  final int? districtId;
  final String? districtName;
  final String? displayName;
  final double? lat;
  final double? lng;

  String get shortLabel {
    final parts = <String>[
      if (regionName != null && regionName!.isNotEmpty) regionName!,
      if (districtName != null && districtName!.isNotEmpty) districtName!,
    ];
    if (parts.isNotEmpty) return parts.join(', ');
    return displayName ?? 'Joylashuv';
  }

  Map<String, dynamic> toJson() => {
        'region_id': regionId,
        'region_name': regionName,
        'district_id': districtId,
        'district_name': districtName,
        'display_name': displayName,
        'lat': lat,
        'lng': lng,
      };

  factory UserLocation.fromJson(Map<String, dynamic> j) => UserLocation(
        regionId: j['region_id'] as int?,
        regionName: j['region_name'] as String?,
        districtId: j['district_id'] as int?,
        districtName: j['district_name'] as String?,
        displayName: j['display_name'] as String?,
        lat: (j['lat'] as num?)?.toDouble(),
        lng: (j['lng'] as num?)?.toDouble(),
      );
}

enum LocationStatus {
  ok,
  serviceDisabled,
  permissionDenied,
  permissionDeniedForever,
  positionError,
  apiError,
}

class LocationResult {
  const LocationResult(this.status, [this.location]);
  final LocationStatus status;
  final UserLocation? location;
}

class LocationService {
  LocationService._();
  static final LocationService instance = LocationService._();

  static const _prefsKey = 'user_location';

  final ValueNotifier<UserLocation?> current = ValueNotifier(null);
  bool _bootstrapped = false;

  Future<void> bootstrap() async {
    if (_bootstrapped) return;
    _bootstrapped = true;
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_prefsKey);
    if (raw != null) {
      try {
        current.value = UserLocation.fromJson(
          Map<String, dynamic>.from(jsonDecode(raw) as Map),
        );
      } catch (_) {}
    }
  }

  Future<void> _save(UserLocation loc) async {
    current.value = loc;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_prefsKey, jsonEncode(loc.toJson()));
  }

  Future<void> clear() async {
    current.value = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_prefsKey);
  }

  Future<bool> openLocationSettings() =>
      Geolocator.openLocationSettings();

  Future<bool> openAppSettings() =>
      Geolocator.openAppSettings();

  Future<LocationResult> detectAndResolve({bool force = false}) async {
    debugPrint('[LocationService] detectAndResolve(force=$force) called');
    if (!force && current.value?.regionId != null) {
      return LocationResult(LocationStatus.ok, current.value);
    }

    final enabled = await Geolocator.isLocationServiceEnabled();
    debugPrint('[LocationService] isLocationServiceEnabled: $enabled');
    if (!enabled) return LocationResult(LocationStatus.serviceDisabled, current.value);

    var perm = await Geolocator.checkPermission();
    debugPrint('[LocationService] initial permission: $perm');
    if (perm == LocationPermission.denied) {
      perm = await Geolocator.requestPermission();
      debugPrint('[LocationService] requested permission result: $perm');
    }
    if (perm == LocationPermission.deniedForever) {
      return LocationResult(LocationStatus.permissionDeniedForever, current.value);
    }
    if (perm != LocationPermission.always && perm != LocationPermission.whileInUse) {
      return LocationResult(LocationStatus.permissionDenied, current.value);
    }

    Position pos;
    try {
      pos = await Geolocator.getCurrentPosition(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.medium,
          timeLimit: Duration(seconds: 12),
        ),
      );
      debugPrint('[LocationService] got position: ${pos.latitude}, ${pos.longitude}');
    } catch (e) {
      debugPrint('[LocationService] getCurrentPosition failed: $e');
      return LocationResult(LocationStatus.positionError, current.value);
    }

    try {
      final res = await ApiClient.instance.post(
        '/public/shared/geo/resolve',
        body: {'lat': pos.latitude, 'lng': pos.longitude},
      );
      debugPrint('[LocationService] response: $res');
      final data = (res is Map && res['data'] is Map)
          ? Map<String, dynamic>.from(res['data'] as Map)
          : const <String, dynamic>{};
      final region = data['region'] is Map
          ? Map<String, dynamic>.from(data['region'] as Map)
          : null;
      final district = data['district'] is Map
          ? Map<String, dynamic>.from(data['district'] as Map)
          : null;
      final resolved = data['resolved'] is Map
          ? Map<String, dynamic>.from(data['resolved'] as Map)
          : const <String, dynamic>{};

      final loc = UserLocation(
        regionId: region?['id'] as int?,
        regionName: region?['name'] as String?,
        districtId: district?['id'] as int?,
        districtName: district?['name'] as String?,
        displayName: (resolved['city'] ?? resolved['state']) as String?,
        lat: pos.latitude,
        lng: pos.longitude,
      );
      await _save(loc);
      return LocationResult(LocationStatus.ok, loc);
    } on ApiException catch (e) {
      debugPrint('[LocationService] ApiException: ${e.statusCode} ${e.message}');
      return LocationResult(LocationStatus.apiError, current.value);
    } catch (e) {
      debugPrint('[LocationService] unexpected error: $e');
      return LocationResult(LocationStatus.apiError, current.value);
    }
  }
}
