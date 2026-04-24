import 'package:flutter_test/flutter_test.dart';

import 'package:uddala_mobile/main.dart';

void main() {
  testWidgets('App boots to onboarding', (WidgetTester tester) async {
    await tester.pumpWidget(const UddalaApp());
    await tester.pump();
    expect(find.text('Uddala'), findsOneWidget);
  });
}
