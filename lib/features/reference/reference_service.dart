import '../../core/api/api_client.dart';
import '../../core/config.dart';

class RefItem {
  RefItem({required this.id, required this.name, this.parentId, this.iconUrl});

  final int id;
  final String name;
  final int? parentId;
  final String? iconUrl;

  factory RefItem.from(Map<String, dynamic> json, {int? parentId}) {
    String pick() {
      final plain = json['name'];
      if (plain is String && plain.isNotEmpty) return plain;
      final primary = switch (AppConfig.appLang) {
        'ru' => json['name_ru'],
        'cyrl' => json['name_cyrl'],
        _ => json['name_uz'],
      };
      if (primary is String && primary.isNotEmpty) return primary;
      for (final k in const ['name_uz', 'name_cyrl', 'name_ru']) {
        final v = json[k];
        if (v is String && v.isNotEmpty) return v;
      }
      return '';
    }

    final icon = json['icon_url'] ?? json['icon'];
    return RefItem(
      id: json['id'] as int,
      name: pick(),
      parentId: parentId,
      iconUrl: icon is String && icon.isNotEmpty ? _rewriteHost(icon) : null,
    );
  }

  static String _rewriteHost(String url) {
    final base = Uri.parse(AppConfig.baseUrl);
    if (!url.startsWith('http')) {
      return '${AppConfig.baseUrl}${url.startsWith('/') ? url : '/$url'}';
    }
    final orig = Uri.tryParse(url);
    if (orig == null) return url;
    return orig.replace(scheme: base.scheme, host: base.host, port: base.port).toString();
  }

  @override
  String toString() => name;
}

class ReferenceService {
  ReferenceService._();
  static final ReferenceService instance = ReferenceService._();

  final _api = ApiClient.instance;

  Future<List<RefItem>> _list(String path, {Map<String, dynamic>? query, String parentField = ''}) async {
    final res = await _api.get(path, query: query, auth: true);
    final data = (res is Map && res['data'] is List) ? res['data'] as List : const [];
    return data
        .whereType<Map>()
        .map((m) => RefItem.from(
              Map<String, dynamic>.from(m),
              parentId: parentField.isNotEmpty ? m[parentField] as int? : null,
            ))
        .toList();
  }

  Future<List<RefItem>> categories() =>
      _list('/admin/categories', query: {'limit': 100});

  Future<List<RefItem>> categoryChilds(int categoryId) => _list(
        '/admin/categoryChilds',
        query: {'limit': 100, 'category_id': categoryId},
        parentField: 'category_id',
      );

  Future<List<RefItem>> regions() =>
      _list('/admin/regions', query: {'limit': 100});

  Future<List<RefItem>> districts(int regionId) => _list(
        '/admin/districts',
        query: {'limit': 100, 'region_id': regionId},
        parentField: 'region_id',
      );
}
