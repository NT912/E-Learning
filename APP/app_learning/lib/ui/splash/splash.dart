import 'package:app_learning/ui/intro/intro_page_view.dart';
import 'package:flutter/material.dart';

class splash extends StatefulWidget {
  const splash({super.key});

  @override
  _IntroPageState createState() => _IntroPageState();
}

class _IntroPageState extends State<splash> {
  @override
  void initState() {
    super.initState();
    // Tự động chuyển sang IntroPage1 sau 3 giây
    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const IntroPageView()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: _buildLogo(),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Image.asset(
      "assets/images/logo.png",
      width: 330,
      height: 330,
      fit: BoxFit.contain,
    );
  }
}
