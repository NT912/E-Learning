import 'package:app_learning/enums/intro_page_position.dart';
import 'package:flutter/material.dart';

import '../Login/Login.dart';

// Giao diện màn hình
class IntroChildPage extends StatefulWidget {
  final IntroPagePosition introPagePosition;
  final VoidCallback nextOnPressed;
  final VoidCallback backOnPressed;

  const IntroChildPage({
    super.key,
    required this.introPagePosition,
    required this.nextOnPressed,
    required this.backOnPressed,
  });

  @override
  State<IntroChildPage> createState() => _IntroChildPageState();
}

class _IntroChildPageState extends State<IntroChildPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _buildSkipButton(),
              _buildOnboardingImage(),
              _buildOnboardingTitleAndContent(),
              _buildOnboardingNextAndPrevButton(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSkipButton() {
    return Container(
      margin: const EdgeInsets.only(top: 16),
      alignment: Alignment.centerRight,
      child: TextButton(
        onPressed: () {
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const Login()),
          );
        },
        child: const Text(
          "Skip",
          style: TextStyle(
            fontSize: 18,
            color: Color(0xFF202244),
          ),
        ),
      ),
    );
  }

  Widget _buildOnboardingImage() {
    return Image.asset(
      "assets/images/logo.png",
      width: 330,
      height: 330,
      fit: BoxFit.contain,
    );
  }

  Widget _buildOnboardingTitleAndContent() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 10).copyWith(top: 50),
      child: Column(
        children: [
          Text(
            widget.introPagePosition.introPageTitle(),
            style: const TextStyle(
              fontSize: 35,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 30),
          Text(
            widget.introPagePosition.introPageContent(),
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 20,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOnboardingNextAndPrevButton() {
    return Container(
      margin:
          EdgeInsets.symmetric(horizontal: 30).copyWith(top: 230, bottom: 25),
      child: Row(
        children: [
          TextButton(
            onPressed: () {
              widget.backOnPressed.call(); // Call the backOnPressed method
            },
            child: const Text(
              "Back",
              style: TextStyle(
                fontSize: 20,
                color: Color(0xFF202244),
              ),
            ),
          ),
          const Spacer(),
          ElevatedButton(
            onPressed: () {
              widget.nextOnPressed.call(); // Call the nextOnPressed method
            },
            child: Text(
              widget.introPagePosition == IntroPagePosition.page2
                  ? "Get Started"
                  : "Next",
              style: const TextStyle(
                fontSize: 20,
                color: Color(0xFF202244),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
