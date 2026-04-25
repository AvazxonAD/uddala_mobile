class AppConfig {
  static const String baseUrl = String.fromEnvironment(
    'API_URL',
    defaultValue: 'http://77.42.66.150:8000',
  );

  static const String appLang = 'uz';
}
