import 'dart:math' as math;
import 'package:flutter/material.dart';

class CustomerRoleIcon extends StatelessWidget {
  const CustomerRoleIcon({super.key, this.size = 72});
  final double size;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(size, size),
      painter: _MagnifierPainter(),
    );
  }
}

class WorkerRoleIcon extends StatelessWidget {
  const WorkerRoleIcon({super.key, this.size = 72});
  final double size;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      size: Size(size, size),
      painter: _BriefcasePainter(),
    );
  }
}

class _MagnifierPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 72;
    Offset p(double x, double y) => Offset(x * s, y * s);
    double r(double v) => v * s;

    // shadow
    canvas.drawOval(
      Rect.fromCenter(center: p(36, 63), width: r(36), height: r(4.4)),
      Paint()..color = Colors.black.withValues(alpha: 0.12),
    );

    // handle (rotated -42deg around 46.5, 50)
    canvas.save();
    canvas.translate(p(46.5, 50).dx, p(46.5, 50).dy);
    canvas.rotate(-42 * math.pi / 180);
    final handleRect = Rect.fromLTWH(r(-3.5), r(-11), r(7), r(22));
    final handleRRect = RRect.fromRectAndRadius(handleRect, Radius.circular(r(3)));
    canvas.drawRRect(
      handleRRect,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFC8975A), Color(0xFF7B4E22)],
        ).createShader(handleRect),
    );
    canvas.restore();

    // rim
    canvas.drawCircle(
      p(28, 28),
      r(20),
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: const [Color(0xFF7CC8F0), Color(0xFF1B5E8C)],
        ).createShader(Rect.fromCircle(center: p(28, 28), radius: r(20))),
    );

    // lens
    final lensRect = Rect.fromCircle(center: p(28, 28), radius: r(15.5));
    canvas.drawCircle(
      p(28, 28),
      r(15.5),
      Paint()
        ..shader = RadialGradient(
          center: const Alignment(-0.3, -0.36),
          radius: 0.75,
          colors: const [Color(0xFFBEE6FF), Color(0xFF3FA9E0), Color(0xFF1E6FA8)],
          stops: const [0, 0.55, 1],
        ).createShader(lensRect),
    );

    // highlight arc
    final highlightPath = Path()
      ..moveTo(p(17, 22).dx, p(17, 22).dy)
      ..quadraticBezierTo(p(22, 15).dx, p(22, 15).dy, p(30, 15).dx, p(30, 15).dy);
    canvas.drawPath(
      highlightPath,
      Paint()
        ..color = Colors.white.withValues(alpha: 0.7)
        ..style = PaintingStyle.stroke
        ..strokeWidth = r(2.6)
        ..strokeCap = StrokeCap.round,
    );

    // highlight dot
    canvas.drawCircle(
      p(21.5, 21.5),
      r(1.6),
      Paint()..color = Colors.white.withValues(alpha: 0.85),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _BriefcasePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width / 72;
    Offset p(double x, double y) => Offset(x * s, y * s);
    double r(double v) => v * s;

    // shadow
    canvas.drawOval(
      Rect.fromCenter(center: p(36, 62), width: r(44), height: r(4.8)),
      Paint()..color = Colors.black.withValues(alpha: 0.13),
    );

    // handle
    final handlePath = Path()
      ..moveTo(p(26, 22).dx, p(26, 22).dy)
      ..quadraticBezierTo(p(26, 13).dx, p(26, 13).dy, p(36, 13).dx, p(36, 13).dy)
      ..quadraticBezierTo(p(46, 13).dx, p(46, 13).dy, p(46, 22).dx, p(46, 22).dy);
    canvas.drawPath(
      handlePath,
      Paint()
        ..color = const Color(0xFF7B4E22)
        ..style = PaintingStyle.stroke
        ..strokeWidth = r(3.4)
        ..strokeCap = StrokeCap.round,
    );
    canvas.drawPath(
      handlePath,
      Paint()
        ..color = const Color(0xFFC28757).withValues(alpha: 0.7)
        ..style = PaintingStyle.stroke
        ..strokeWidth = r(1.2)
        ..strokeCap = StrokeCap.round,
    );

    // body
    final bodyRect = Rect.fromLTWH(r(10), r(22), r(52), r(34));
    canvas.drawRRect(
      RRect.fromRectAndRadius(bodyRect, Radius.circular(r(4))),
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFC28757), Color(0xFF9B5E2C), Color(0xFF6C3C14)],
          stops: [0, 0.55, 1],
        ).createShader(bodyRect),
    );

    // top strip
    final topRect = Rect.fromLTWH(r(10), r(22), r(52), r(7));
    canvas.drawRRect(
      RRect.fromRectAndRadius(topRect, Radius.circular(r(3))),
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFD8A371), Color(0xFFA86D38)],
        ).createShader(topRect),
    );

    // horizontal seam
    canvas.drawLine(
      p(10, 36),
      p(62, 36),
      Paint()
        ..color = const Color(0xFF5C3212).withValues(alpha: 0.6)
        ..strokeWidth = r(1),
    );

    // clasp
    final claspRect = Rect.fromLTWH(r(32.5), r(32.5), r(7), r(7));
    canvas.drawRRect(
      RRect.fromRectAndRadius(claspRect, Radius.circular(r(1.2))),
      Paint()..color = const Color(0xFFE4B87A),
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(claspRect, Radius.circular(r(1.2))),
      Paint()
        ..color = const Color(0xFF5C3212)
        ..style = PaintingStyle.stroke
        ..strokeWidth = r(0.8),
    );
    final holeRect = Rect.fromLTWH(r(34.3), r(35), r(3.4), r(1.2));
    canvas.drawRRect(
      RRect.fromRectAndRadius(holeRect, Radius.circular(r(0.4))),
      Paint()..color = const Color(0xFF5C3212),
    );

    // body highlight
    canvas.drawRect(
      Rect.fromLTWH(r(10), r(29), r(52), r(1.2)),
      Paint()..color = Colors.white.withValues(alpha: 0.18),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
