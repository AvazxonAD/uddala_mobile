import '../../core/api/api_client.dart';
import 'job_models.dart';

class JobService {
  JobService._();
  static final JobService instance = JobService._();

  final _api = ApiClient.instance;

  Future<Job> create(NewJob job) async {
    final res = await _api.post('/client/jobs', body: job.toJson(), auth: true);
    final data = (res is Map && res['data'] is Map) ? res['data'] as Map : const {};
    return Job.fromJson(Map<String, dynamic>.from(data));
  }

  Future<List<Job>> myJobs({int page = 1, int limit = 20}) async {
    final res = await _api.get(
      '/client/jobs',
      query: {'page': page, 'limit': limit},
      auth: true,
    );
    final list = (res is Map && res['data'] is List) ? res['data'] as List : const [];
    return list
        .whereType<Map>()
        .map((m) => Job.fromJson(Map<String, dynamic>.from(m)))
        .toList();
  }
}
