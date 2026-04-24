import 'package:flutter/material.dart';

import '../core/theme.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.trailingIcon,
    this.block = true,
    this.height = 56,
  });

  final String label;
  final VoidCallback? onPressed;
  final IconData? trailingIcon;
  final bool block;
  final double height;

  @override
  Widget build(BuildContext context) {
    final enabled = onPressed != null;
    final button = SizedBox(
      height: height,
      child: FilledButton(
        onPressed: onPressed,
        style: FilledButton.styleFrom(
          backgroundColor: AppColors.primary,
          disabledBackgroundColor: AppColors.primary.withValues(alpha: 0.35),
          foregroundColor: Colors.white,
          disabledForegroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 20),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              label,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                letterSpacing: -0.2,
              ),
            ),
            if (trailingIcon != null) ...[
              const SizedBox(width: 8),
              Icon(trailingIcon, size: 20, color: Colors.white.withValues(alpha: enabled ? 1 : 0.8)),
            ],
          ],
        ),
      ),
    );
    return block ? SizedBox(width: double.infinity, child: button) : button;
  }
}
