import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/storage/token_storage.dart';
import '../../core/theme.dart';
import '../location/location_service.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();
    _decide();
  }

  Future<void> _decide() async {
    await LocationService.instance.bootstrap();
    final token = await TokenStorage.read();
    if (!mounted) return;
    if (token != null && token.isNotEmpty) {
      context.go('/customer');
    } else {
      context.go('/onboarding');
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: AppColors.surface,
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
