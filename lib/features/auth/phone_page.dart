import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/api_client.dart';
import '../../core/strings.dart';
import '../../core/theme.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/step_progress.dart';
import '../../widgets/uddala_logo.dart';
import 'auth_service.dart';

class PhonePage extends StatefulWidget {
  const PhonePage({super.key, required this.role});

  final String role;

  @override
  State<PhonePage> createState() => _PhonePageState();
}

class _PhonePageState extends State<PhonePage> {
  final _controller = TextEditingController();
  final _focus = FocusNode();

  @override
  void initState() {
    super.initState();
    _controller.addListener(() => setState(() {}));
    WidgetsBinding.instance.addPostFrameCallback((_) => _focus.requestFocus());
  }

  @override
  void dispose() {
    _controller.dispose();
    _focus.dispose();
    super.dispose();
  }

  String get _digits => _controller.text.replaceAll(RegExp(r'[^0-9]'), '');

  bool _loading = false;

  Future<void> _next() async {
    if (_loading) return;
    final phone = _digits;
    final fullPhone = '998$phone';
    setState(() => _loading = true);
    try {
      await AuthService.instance.login(phone: fullPhone);
      if (!mounted) return;
      context.push('/otp?role=${widget.role}&phone=$phone');
    } on ApiException catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.message)),
      );
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Internet bilan bog\'lanishda xatolik')),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final canNext = _digits.length >= 9;
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 24),
              child: Row(
                children: [
                  BackSquare(onTap: () => context.pop()),
                  const SizedBox(width: 12),
                  const Expanded(child: StepProgress(step: 2)),
                ],
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Column(
                  children: [
                    const UddalaLogo(size: 64),
                    const SizedBox(height: 14),
                    const Text(
                      S.phoneTitle,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -0.5,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const SizedBox(
                      width: 280,
                      child: Text(
                        S.phoneSub,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 14,
                          color: AppColors.textMuted,
                          height: 1.5,
                        ),
                      ),
                    ),
                    const SizedBox(height: 36),
                    _PhoneField(controller: _controller, focus: _focus),
                    const SizedBox(height: 40),
                    PrimaryButton(
                      label: _loading ? '...' : S.next,
                      trailingIcon: Icons.arrow_forward,
                      onPressed: (canNext && !_loading) ? _next : null,
                    ),
                    const SizedBox(height: 30),
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

class _PhoneField extends StatelessWidget {
  const _PhoneField({required this.controller, required this.focus});

  final TextEditingController controller;
  final FocusNode focus;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.surface2,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: [
          const _UzFlag(),
          const SizedBox(width: 8),
          const Text(
            '+998',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: AppColors.textMuted,
            ),
          ),
          const SizedBox(width: 12),
          Container(width: 1, height: 20, color: AppColors.border),
          const SizedBox(width: 12),
          Expanded(
            child: TextField(
              controller: controller,
              focusNode: focus,
              keyboardType: TextInputType.phone,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(9),
                _UzPhoneFormatter(),
              ],
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppColors.text,
                letterSpacing: 0.3,
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: '99 299 39 39',
                hintStyle: TextStyle(
                  color: AppColors.textSoft,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 0.3,
                ),
                isCollapsed: true,
                contentPadding: EdgeInsets.symmetric(vertical: 14),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _UzFlag extends StatelessWidget {
  const _UzFlag();

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(3),
      child: const SizedBox(
        width: 26,
        height: 18,
        child: Column(
          children: [
            Expanded(child: ColoredBox(color: AppColors.uzFlagBlue)),
            Expanded(child: ColoredBox(color: Colors.white)),
            Expanded(child: ColoredBox(color: AppColors.uzFlagGreen)),
          ],
        ),
      ),
    );
  }
}

class _UzPhoneFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
    TextEditingValue oldValue,
    TextEditingValue newValue,
  ) {
    final digits = newValue.text.replaceAll(RegExp(r'[^0-9]'), '');
    final buf = StringBuffer();
    for (var i = 0; i < digits.length; i++) {
      if (i == 2 || i == 5 || i == 7) buf.write(' ');
      buf.write(digits[i]);
    }
    final formatted = buf.toString();
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }
}
