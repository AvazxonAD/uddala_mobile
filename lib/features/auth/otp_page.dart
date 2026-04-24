import 'dart:async';

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

class OtpPage extends StatefulWidget {
  const OtpPage({super.key, required this.role, required this.phone});

  final String role;
  final String phone;

  @override
  State<OtpPage> createState() => _OtpPageState();
}

class _OtpPageState extends State<OtpPage> {
  static const _length = 4;
  final _controller = TextEditingController();
  final _focus = FocusNode();
  Timer? _timer;
  int _seconds = 42;

  @override
  void initState() {
    super.initState();
    _controller.addListener(() => setState(() {}));
    WidgetsBinding.instance.addPostFrameCallback((_) => _focus.requestFocus());
    _startTimer();
  }

  void _startTimer() {
    _timer?.cancel();
    _seconds = 42;
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return;
      if (_seconds <= 0) {
        t.cancel();
        return;
      }
      setState(() => _seconds--);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _controller.dispose();
    _focus.dispose();
    super.dispose();
  }

  String get _code => _controller.text.replaceAll(RegExp(r'[^0-9]'), '');

  bool _loading = false;

  Future<void> _verify() async {
    if (_loading) return;
    setState(() => _loading = true);
    try {
      await AuthService.instance.verify(
        phone: '998${widget.phone}',
        code: _code,
      );
      if (!mounted) return;
      context.go('/home?role=${widget.role}');
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

  String _formatPhone() {
    final d = widget.phone;
    if (d.length < 9) return d;
    return '${d.substring(0, 2)} ${d.substring(2, 5)} ${d.substring(5, 7)} ${d.substring(7)}';
  }

  String _timerLabel() {
    final m = _seconds ~/ 60;
    final s = (_seconds % 60).toString().padLeft(2, '0');
    return '$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    final canConfirm = _code.length >= _length;
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
                  const Expanded(child: StepProgress(step: 3)),
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
                      S.otpTitle,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w800,
                        letterSpacing: -0.5,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 6),
                    SizedBox(
                      width: 300,
                      child: RichText(
                        textAlign: TextAlign.center,
                        text: TextSpan(
                          style: const TextStyle(
                            fontSize: 14,
                            color: AppColors.textMuted,
                            height: 1.5,
                          ),
                          children: [
                            TextSpan(
                              text: '+998 ${_formatPhone()}',
                              style: const TextStyle(
                                color: AppColors.text,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const TextSpan(text: ' '),
                            const TextSpan(text: S.otpSub),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 36),
                    _OtpBoxes(controller: _controller, focus: _focus, length: _length),
                    const SizedBox(height: 24),
                    TextButton(
                      onPressed: _seconds == 0
                          ? () {
                              _startTimer();
                            }
                          : null,
                      style: TextButton.styleFrom(
                        foregroundColor: AppColors.primary,
                        disabledForegroundColor: AppColors.primary,
                        padding: EdgeInsets.zero,
                      ),
                      child: Text(
                        _seconds == 0
                            ? S.resend
                            : '${S.resend} · ${_timerLabel()}',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    PrimaryButton(
                      label: _loading ? '...' : S.confirm,
                      trailingIcon: Icons.arrow_forward,
                      onPressed: (canConfirm && !_loading) ? _verify : null,
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

class _OtpBoxes extends StatelessWidget {
  const _OtpBoxes({
    required this.controller,
    required this.focus,
    required this.length,
  });

  final TextEditingController controller;
  final FocusNode focus;
  final int length;

  @override
  Widget build(BuildContext context) {
    final code = controller.text;
    return Stack(
      children: [
        Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(length, (i) {
            final filled = i < code.length;
            final char = filled ? code[i] : '';
            return Container(
              width: 58,
              height: 66,
              margin: EdgeInsets.only(right: i == length - 1 ? 0 : 12),
              decoration: BoxDecoration(
                color: filled ? AppColors.primarySoft : AppColors.surface,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: filled ? AppColors.primary : AppColors.border,
                  width: 1.5,
                ),
              ),
              child: Center(
                child: Text(
                  char,
                  style: const TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.w800,
                    color: AppColors.text,
                  ),
                ),
              ),
            );
          }),
        ),
        Positioned.fill(
          child: Opacity(
            opacity: 0.01,
            child: TextField(
              controller: controller,
              focusNode: focus,
              autofocus: true,
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
                LengthLimitingTextInputFormatter(length),
              ],
              decoration: const InputDecoration(border: InputBorder.none),
              showCursor: false,
            ),
          ),
        ),
      ],
    );
  }
}
