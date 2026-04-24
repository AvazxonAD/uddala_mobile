import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../core/strings.dart';
import '../../core/theme.dart';
import '../../widgets/role_card.dart';
import '../../widgets/step_progress.dart';
import '../../widgets/uddala_logo.dart';

class OnboardingPage extends StatelessWidget {
  const OnboardingPage({super.key});

  void _pickRole(BuildContext context, String role) {
    context.push('/phone?role=$role');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 24),
              child: const StepProgress(step: 1),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const SizedBox(height: 24),
                    const UddalaLogo(size: 76),
                    const SizedBox(height: 14),
                    const Text(
                      'Uddala',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -0.8,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 6),
                    const SizedBox(
                      width: 260,
                      child: Text(
                        S.tagline,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 14,
                          color: AppColors.textMuted,
                          height: 1.4,
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    RoleCard(
                      role: 'customer',
                      title: S.needService,
                      onTap: () => _pickRole(context, 'customer'),
                    ),
                    const SizedBox(height: 14),
                    RoleCard(
                      role: 'worker',
                      title: S.needJob,
                      onTap: () => _pickRole(context, 'worker'),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 24),
              child: RichText(
                textAlign: TextAlign.center,
                text: const TextSpan(
                  style: TextStyle(
                    fontSize: 12,
                    color: AppColors.textSoft,
                    height: 1.5,
                  ),
                  children: [
                    TextSpan(text: S.termsPrefix),
                    TextSpan(
                      text: S.termsLink,
                      style: TextStyle(
                        color: AppColors.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    TextSpan(text: S.termsSuffix),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
