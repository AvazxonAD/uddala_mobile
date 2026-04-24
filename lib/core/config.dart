class AppConfig {
  static const String baseUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://192.168.137.1:8000',
  );

  static const String appLang = 'uz';
}
