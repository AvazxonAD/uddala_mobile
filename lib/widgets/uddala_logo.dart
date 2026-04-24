import 'package:flutter/material.dart';

class UddalaLogo extends StatelessWidget {
  const UddalaLogo({super.key, this.size = 56});

  final double size;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      'assets/images/logo-mark.png',
      width: size,
      height: size,
      fit: BoxFit.contain,
    );
  }
}
