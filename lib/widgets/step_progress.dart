import 'package:flutter/material.dart';

import '../core/theme.dart';

class StepProgress extends StatelessWidget {
  const StepProgress({
    super.key,
    required this.step,
    this.total = 3,
  });

  final int step;
  final int total;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Row(
            children: List.generate(total, (i) {
              final active = i < step;
              return Expanded(
                child: Container(
                  height: 5,
                  margin: EdgeInsets.only(right: i == total - 1 ? 0 : 6),
                  decoration: BoxDecoration(
                    color: active ? AppColors.primary : AppColors.border,
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
              );
            }),
          ),
        ),
        const SizedBox(width: 10),
        Text(
          '$step / $total',
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w700,
            color: AppColors.textMuted,
          ),
        ),
      ],
    );
  }
}

class BackSquare extends StatelessWidget {
  const BackSquare({super.key, required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppColors.surface2,
      borderRadius: BorderRadius.circular(10),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: const SizedBox(
          width: 36,
          height: 36,
          child: Icon(Icons.arrow_back, size: 18, color: AppColors.text),
        ),
      ),
    );
  }
}
