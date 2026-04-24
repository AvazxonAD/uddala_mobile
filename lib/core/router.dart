import 'package:go_router/go_router.dart';

import '../features/auth/onboarding_page.dart';
import '../features/auth/otp_page.dart';
import '../features/auth/phone_page.dart';
import '../features/auth/placeholder_home_page.dart';
import '../features/auth/splash_page.dart';
import '../features/customer/customer_home_page.dart';
import '../features/customer/post_job_page.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashPage(),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingPage(),
    ),
    GoRoute(
      path: '/phone',
      builder: (context, state) {
        final role = state.uri.queryParameters['role'] ?? 'customer';
        return PhonePage(role: role);
      },
    ),
    GoRoute(
      path: '/otp',
      builder: (context, state) {
        final role = state.uri.queryParameters['role'] ?? 'customer';
        final phone = state.uri.queryParameters['phone'] ?? '';
        return OtpPage(role: role, phone: phone);
      },
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) {
        final role = state.uri.queryParameters['role'] ?? 'customer';
        if (role == 'customer') return const CustomerHomePage();
        return PlaceholderHomePage(role: role);
      },
    ),
    GoRoute(
      path: '/customer',
      builder: (context, state) => const CustomerHomePage(),
    ),
    GoRoute(
      path: '/customer/post-job',
      builder: (context, state) => const PostJobPage(),
    ),
  ],
);
