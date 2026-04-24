import 'package:flutter/material.dart';

import '../core/theme.dart';
import 'role_icons.dart';

class RoleCard extends StatefulWidget {
  const RoleCard({
    super.key,
    required this.role,
    required this.title,
    required this.onTap,
  });

  final String role; // "customer" | "worker"
  final String title;
  final VoidCallback onTap;

  @override
  State<RoleCard> createState() => _RoleCardState();
}

class _RoleCardState extends State<RoleCard> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final isCustomer = widget.role == "customer";
    return GestureDetector(
      onTapDown: (_) => setState(() => _pressed = true),
      onTapCancel: () => setState(() => _pressed = false),
      onTapUp: (_) => setState(() => _pressed = false),
      onTap: widget.onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        padding: const EdgeInsets.fromLTRB(18, 26, 18, 22),
        decoration: BoxDecoration(
          color: _pressed ? AppColors.surface : AppColors.surface2,
          borderRadius: BorderRadius.circular(AppRadius.xl),
          border: Border.all(
            color: _pressed ? AppColors.primary : Colors.transparent,
            width: 1.5,
          ),
        ),
        child: Column(
          children: [
            SizedBox(
              width: 80,
              height: 80,
              child: Center(
                child: isCustomer
                    ? const CustomerRoleIcon(size: 72)
                    : const WorkerRoleIcon(size: 72),
              ),
            ),
            const SizedBox(height: 14),
            Text(
              widget.title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppColors.text,
                letterSpacing: -0.2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
