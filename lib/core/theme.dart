import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const primary = Color(0xFF1BA9F5);
  static const primaryDark = Color(0xFF0B8BD1);
  static const primarySoft = Color(0xFFE8F6FE);

  static const surface = Color(0xFFFFFFFF);
  static const surface2 = Color(0xFFF5F8FA);
  static const border = Color(0xFFE5EBF0);

  static const text = Color(0xFF0F1B24);
  static const textMuted = Color(0xFF4B5C69);
  static const textSoft = Color(0xFF8694A0);

  static const uzFlagBlue = Color(0xFF1BA9F5);
  static const uzFlagGreen = Color(0xFF16B378);
}

class AppRadius {
  static const sm = 10.0;
  static const md = 14.0;
  static const lg = 18.0;
  static const xl = 22.0;
}

class AppTheme {
  static ThemeData light() {
    final base = ThemeData.light(useMaterial3: true);
    final textTheme = GoogleFonts.manropeTextTheme(base.textTheme).apply(
      bodyColor: AppColors.text,
      displayColor: AppColors.text,
    );

    return base.copyWith(
      colorScheme: const ColorScheme.light(
        primary: AppColors.primary,
        onPrimary: Colors.white,
        surface: AppColors.surface,
        onSurface: AppColors.text,
      ),
      scaffoldBackgroundColor: AppColors.surface,
      textTheme: textTheme,
      splashFactory: InkRipple.splashFactory,
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.surface,
        foregroundColor: AppColors.text,
        elevation: 0,
        scrolledUnderElevation: 0,
      ),
    );
  }
}
