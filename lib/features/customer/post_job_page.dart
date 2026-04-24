import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/api_client.dart';
import '../../core/theme.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/step_progress.dart';
import '../job/job_models.dart';
import '../job/job_service.dart';
import '../location/location_service.dart';
import '../reference/category_visuals.dart';
import '../reference/reference_service.dart';

class PostJobPage extends StatefulWidget {
  const PostJobPage({super.key});

  @override
  State<PostJobPage> createState() => _PostJobPageState();
}

class _PostJobPageState extends State<PostJobPage> {
  static const _totalSteps = 2;

  int _step = 0;

  final _description = TextEditingController();
  final _salary = TextEditingController();

  List<RefItem> _categories = const [];
  List<RefItem> _regions = const [];
  List<RefItem> _districts = const [];

  RefItem? _category;
  RefItem? _region;
  RefItem? _district;
  String _salaryType = 'fixed';

  bool _loadingRefs = true;
  bool _submitting = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadRefs();
  }

  @override
  void dispose() {
    _description.dispose();
    _salary.dispose();
    super.dispose();
  }

  Future<void> _loadRefs() async {
    setState(() {
      _loadingRefs = true;
      _error = null;
    });
    try {
      final cats = await ReferenceService.instance.categories();
      final regs = await ReferenceService.instance.regions();
      if (!mounted) return;
      setState(() {
        _categories = cats;
        _regions = regs;
        _loadingRefs = false;
      });
      unawaited(_prefillFromLocation());
    } on ApiException catch (e) {
      if (!mounted) return;
      setState(() {
        _error = e.message;
        _loadingRefs = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() {
        _error = 'Ma\'lumotlarni yuklashda xatolik';
        _loadingRefs = false;
      });
    }
  }

  Future<void> _prefillFromLocation() async {
    final res = await LocationService.instance.detectAndResolve(force: true);
    final loc = res.location ?? LocationService.instance.current.value;
    final regionId = loc?.regionId;
    if (regionId == null || !mounted) return;

    final region = _regions.where((r) => r.id == regionId).cast<RefItem?>().firstWhere(
          (_) => true,
          orElse: () => null,
        );
    if (region == null) return;
    if (_region != null) return;

    setState(() => _region = region);
    try {
      final dists = await ReferenceService.instance.districts(region.id);
      if (!mounted) return;
      final districtId = loc?.districtId;
      final district = districtId == null
          ? null
          : dists.where((d) => d.id == districtId).cast<RefItem?>().firstWhere(
                (_) => true,
                orElse: () => null,
              );
      setState(() {
        _districts = dists;
        if (_district == null && district != null) _district = district;
      });
    } catch (_) {}
  }

  Future<void> _onPickRegion(RefItem r) async {
    setState(() {
      _region = r;
      _district = null;
      _districts = const [];
    });
    try {
      final dists = await ReferenceService.instance.districts(r.id);
      if (!mounted) return;
      setState(() => _districts = dists);
    } catch (_) {}
  }

  int? get _salaryValue {
    final digits = _salary.text.replaceAll(RegExp(r'\D'), '');
    return digits.isEmpty ? null : int.tryParse(digits);
  }

  bool get _canProceed {
    if (_step == 0) return _category != null;
    final s = _salaryValue;
    return _region != null &&
        _district != null &&
        _description.text.trim().length >= 3 &&
        s != null &&
        s > 0;
  }

  void _onBack() {
    if (_step == 0) {
      context.pop();
    } else {
      setState(() => _step--);
    }
  }

  Future<void> _onNext() async {
    if (!_canProceed || _submitting) return;
    if (_step < _totalSteps - 1) {
      setState(() => _step++);
      return;
    }
    await _submit();
  }

  Future<void> _submit() async {
    setState(() => _submitting = true);
    try {
      await JobService.instance.create(NewJob(
        categoryId: _category!.id,
        description: _description.text.trim(),
        regionId: _region!.id,
        districtId: _district!.id,
        salaryType: _salaryType,
        salary: _salaryValue!,
      ));
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('E\'lon yaratildi')),
      );
      context.pop(true);
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
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isLast = _step == _totalSteps - 1;
    return Scaffold(
      backgroundColor: AppColors.surface,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 16),
              child: Row(
                children: [
                  BackSquare(onTap: _onBack),
                  const SizedBox(width: 12),
                  Expanded(
                    child: StepProgress(step: _step + 1, total: _totalSteps),
                  ),
                ],
              ),
            ),
            Expanded(
              child: _loadingRefs
                  ? const Center(child: CircularProgressIndicator())
                  : _error != null
                      ? _buildError()
                      : _buildStep(),
            ),
            if (_step != 0)
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
                child: PrimaryButton(
                  label: _submitting
                      ? '...'
                      : (isLast ? 'E\'lonni yuborish' : 'Keyingisi'),
                  trailingIcon: isLast ? Icons.check : Icons.arrow_forward,
                  onPressed: _canProceed && !_submitting ? _onNext : null,
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 48, color: AppColors.textSoft),
            const SizedBox(height: 12),
            Text(_error!, textAlign: TextAlign.center),
            const SizedBox(height: 12),
            TextButton(onPressed: _loadRefs, child: const Text('Qayta urinish')),
          ],
        ),
      ),
    );
  }

  Widget _buildStep() {
    return _step == 0 ? _buildCategoryStep() : _buildDetailsStep();
  }

  Widget _buildCategoryStep() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
      children: [
        const Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: Text(
            'Kategoriyani tanlang',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.5,
              color: AppColors.text,
            ),
          ),
        ),
        if (_categories.isEmpty)
          const Padding(
            padding: EdgeInsets.all(24),
            child: Center(
              child: Text(
                'Kategoriyalar topilmadi',
                style: TextStyle(color: AppColors.textMuted),
              ),
            ),
          )
        else
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              mainAxisExtent: 66,
            ),
            itemCount: _categories.length,
            itemBuilder: (_, i) {
              final c = _categories[i];
              return _CategoryTile(
                item: c,
                selected: _category?.id == c.id,
                onTap: () {
                  setState(() {
                    _category = c;
                    _step = 1;
                  });
                },
              );
            },
          ),
      ],
    );
  }

  Widget _buildDetailsStep() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
      children: [
        const Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: Text(
            'Ishni tavsiflang',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              letterSpacing: -0.5,
              color: AppColors.text,
            ),
          ),
        ),
        _Label('Tavsif'),
        _TextBox(
          controller: _description,
          hint: 'Ish haqida batafsil yozing',
          minLines: 3,
          maxLines: 6,
          onChanged: (_) => setState(() {}),
        ),
        const SizedBox(height: 14),
        _Label('Viloyat'),
        _Picker<RefItem>(
          value: _region,
          items: _regions,
          hint: 'Tanlang',
          onPicked: _onPickRegion,
        ),
        const SizedBox(height: 14),
        _Label('Tuman'),
        _Picker<RefItem>(
          value: _district,
          items: _districts,
          hint: _region == null ? 'Avval viloyat tanlang' : 'Tanlang',
          onPicked: (v) => setState(() => _district = v),
          enabled: _region != null && _districts.isNotEmpty,
        ),
        const SizedBox(height: 14),
        _Label('To\'lov turi'),
        _SalaryTypeSegmented(
          value: _salaryType,
          onChanged: (v) => setState(() => _salaryType = v),
        ),
        const SizedBox(height: 14),
        _Label('Summa (so\'m)'),
        _TextBox(
          controller: _salary,
          hint: '500 000',
          keyboardType: TextInputType.number,
          inputFormatters: [
            FilteringTextInputFormatter.digitsOnly,
            _ThousandsSeparatorFormatter(),
          ],
          onChanged: (_) => setState(() {}),
        ),
      ],
    );
  }
}

class _CategoryTile extends StatelessWidget {
  const _CategoryTile({
    required this.item,
    required this.selected,
    required this.onTap,
  });

  final RefItem item;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final v = visualFor(item.name);
    return InkWell(
      borderRadius: BorderRadius.circular(AppRadius.md),
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
        decoration: BoxDecoration(
          color: selected ? AppColors.primarySoft : AppColors.surface,
          borderRadius: BorderRadius.circular(AppRadius.md),
          border: Border.all(
            color: selected ? AppColors.primary : AppColors.border,
            width: selected ? 1.5 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 38,
              height: 38,
              decoration: BoxDecoration(
                color: Color.alphaBlend(
                  v.color.withValues(alpha: 0.18),
                  Colors.white,
                ),
                borderRadius: BorderRadius.circular(10),
              ),
              alignment: Alignment.center,
              child: item.iconUrl != null
                  ? SvgPicture.network(
                      item.iconUrl!,
                      width: 22,
                      height: 22,
                      placeholderBuilder: (_) => Text(v.emoji, style: const TextStyle(fontSize: 20)),
                    )
                  : Text(v.emoji, style: const TextStyle(fontSize: 20)),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                item.name,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: AppColors.text,
                  height: 1.2,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Label extends StatelessWidget {
  const _Label(this.text);
  final String text;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6, left: 2),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: AppColors.textMuted,
        ),
      ),
    );
  }
}

class _Picker<T> extends StatelessWidget {
  const _Picker({
    required this.value,
    required this.items,
    required this.hint,
    required this.onPicked,
    this.enabled = true,
  });

  final T? value;
  final List<T> items;
  final String hint;
  final ValueChanged<T> onPicked;
  final bool enabled;

  void _open(BuildContext context) {
    if (!enabled || items.isEmpty) return;
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: AppColors.surface,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (ctx) => SafeArea(
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(ctx).size.height * 0.7,
          ),
          child: ListView.separated(
            shrinkWrap: true,
            padding: const EdgeInsets.only(bottom: 16),
            itemCount: items.length,
            separatorBuilder: (_, _) =>
                const Divider(height: 1, color: AppColors.border),
            itemBuilder: (_, i) {
              final it = items[i];
              return ListTile(
                title: Text(it.toString()),
                onTap: () {
                  Navigator.pop(ctx);
                  onPicked(it);
                },
              );
            },
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final label = value?.toString() ?? hint;
    final isPlaceholder = value == null;
    return InkWell(
      borderRadius: BorderRadius.circular(AppRadius.md),
      onTap: () => _open(context),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
        decoration: BoxDecoration(
          color: enabled ? AppColors.surface2 : AppColors.surface2.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(AppRadius.md),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: isPlaceholder ? AppColors.textSoft : AppColors.text,
                ),
              ),
            ),
            const Icon(Icons.expand_more, color: AppColors.textMuted),
          ],
        ),
      ),
    );
  }
}

class _TextBox extends StatelessWidget {
  const _TextBox({
    required this.controller,
    required this.hint,
    this.keyboardType,
    this.minLines = 1,
    this.maxLines = 1,
    this.inputFormatters,
    this.onChanged,
  });

  final TextEditingController controller;
  final String hint;
  final TextInputType? keyboardType;
  final int minLines;
  final int maxLines;
  final List<TextInputFormatter>? inputFormatters;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
      decoration: BoxDecoration(
        color: AppColors.surface2,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: AppColors.border),
      ),
      child: TextField(
        controller: controller,
        keyboardType: keyboardType,
        minLines: minLines,
        maxLines: maxLines,
        inputFormatters: inputFormatters,
        onChanged: onChanged,
        style: const TextStyle(
          fontSize: 15,
          fontWeight: FontWeight.w600,
          color: AppColors.text,
        ),
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: const TextStyle(
            color: AppColors.textSoft,
            fontWeight: FontWeight.w500,
          ),
          border: InputBorder.none,
          isCollapsed: true,
          contentPadding: const EdgeInsets.symmetric(vertical: 14),
        ),
      ),
    );
  }
}

class _SalaryTypeSegmented extends StatelessWidget {
  const _SalaryTypeSegmented({required this.value, required this.onChanged});

  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final options = const [
      ('fixed', 'Ishbay'),
      ('daily', 'Kunbay'),
      ('hourly', 'Soatbay'),
    ];
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppColors.surface2,
        borderRadius: BorderRadius.circular(AppRadius.md),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        children: options.map((o) {
          final selected = value == o.$1;
          return Expanded(
            child: GestureDetector(
              onTap: () => onChanged(o.$1),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 10),
                decoration: BoxDecoration(
                  color: selected ? AppColors.primary : Colors.transparent,
                  borderRadius: BorderRadius.circular(AppRadius.sm),
                ),
                child: Text(
                  o.$2,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w700,
                    color: selected ? Colors.white : AppColors.textMuted,
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}

class _ThousandsSeparatorFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(TextEditingValue oldValue, TextEditingValue newValue) {
    final digits = newValue.text.replaceAll(RegExp(r'\D'), '');
    if (digits.isEmpty) {
      return const TextEditingValue();
    }
    final buf = StringBuffer();
    for (int i = 0; i < digits.length; i++) {
      final remaining = digits.length - i;
      buf.write(digits[i]);
      if (remaining > 1 && remaining % 3 == 1) buf.write(' ');
    }
    final formatted = buf.toString();
    return TextEditingValue(
      text: formatted,
      selection: TextSelection.collapsed(offset: formatted.length),
    );
  }
}
