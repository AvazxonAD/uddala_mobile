class Job {
  Job({
    required this.id,
    required this.description,
    required this.salary,
    required this.salaryType,
    required this.status,
    this.categoryName,
    this.regionName,
    this.districtName,
    this.createdAt,
  });

  final int id;
  final String description;
  final int salary;
  final String salaryType;
  final String status;
  final String? categoryName;
  final String? regionName;
  final String? districtName;
  final DateTime? createdAt;

  factory Job.fromJson(Map<String, dynamic> json) {
    return Job(
      id: json['id'] as int,
      description: (json['description'] ?? '') as String,
      salary: (json['salary'] ?? 0) as int,
      salaryType: (json['salary_type'] ?? 'fixed') as String,
      status: (json['job_status'] ?? 'active') as String,
      categoryName: json['category_name'] as String?,
      regionName: json['region_name'] as String?,
      districtName: json['district_name'] as String?,
      createdAt: json['created_at'] is String
          ? DateTime.tryParse(json['created_at'] as String)
          : null,
    );
  }
}

class NewJob {
  NewJob({
    required this.categoryId,
    required this.description,
    required this.regionId,
    required this.districtId,
    required this.salaryType,
    required this.salary,
  });

  final int categoryId;
  final String description;
  final int regionId;
  final int districtId;
  final String salaryType;
  final int salary;

  Map<String, dynamic> toJson() => {
        'category_id': categoryId,
        'description': description,
        'region_id': regionId,
        'district_id': districtId,
        'salary_type': salaryType,
        'salary': salary,
      };
}
