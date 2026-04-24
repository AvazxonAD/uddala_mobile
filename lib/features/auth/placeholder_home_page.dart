import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/api_client.dart';
import '../../core/strings.dart';
import '../../core/theme.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/uddala_logo.dart';
import 'auth_service.dart';

class PlaceholderHomePage extends StatefulWidget {
  const PlaceholderHomePage({super.key, required this.role});

  final String role;

  @override
  State<PlaceholderHomePage> createState() => _PlaceholderHomePageState();
}

class _PlaceholderHomePageState extends State<PlaceholderHomePage> {
  Map<String, dynamic>? _me;
  String? _error;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final me = await AuthService.instance.me();
      if (!mounted) return;
      setState(() => _me = me);
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() => _error = e.message);
    } catch (_) {
      if (!mounted) return;
      setState(() => _error = 'Internet bilan bog\'lanishda xatolik');
    }
  }

  Future<void> _logout() async {
    await AuthService.instance.logout();
    if (!mounted) return;
    context.go('/onboarding');
  }

  @override
  Widget build(BuildContext context) {
    final label = widget.role == 'customer' ? 'Mijoz' : 'Xodim';
    final phone = _me?['phone'] as String?;
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const UddalaLogo(size: 96),
              const SizedBox(height: 20),
              const Text(
                S.welcomeTitle,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.5,
                  color: AppColors.text,
                ),
              ),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: AppColors.primarySoft,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  'Rol: $label',
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: AppColors.primaryDark,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              if (phone != null)
                Text(
                  '+$phone',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: AppColors.text,
                  ),
                )
              else if (_error != null)
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 13,
                    color: Colors.red,
                  ),
                )
              else
                const CircularProgressIndicator(),
              const SizedBox(height: 16),
              const SizedBox(
                width: 300,
                child: Text(
                  S.welcomeSub,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 14,
                    color: AppColors.textMuted,
                    height: 1.5,
                  ),
                ),
              ),
              const SizedBox(height: 40),
              PrimaryButton(
                label: 'Chiqish',
                block: false,
                onPressed: _logout,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
