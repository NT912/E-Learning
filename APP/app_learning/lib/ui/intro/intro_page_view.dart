import 'package:app_learning/enums/intro_page_position.dart';
import 'package:app_learning/ui/Login/Login.dart';
import 'package:app_learning/ui/intro/intro_child_page.dart';
import 'package:flutter/material.dart';

class IntroPageView extends StatefulWidget {
  const IntroPageView({super.key});

  @override
  State<IntroPageView> createState() => _IntroPageViewState();
}

class _IntroPageViewState extends State<IntroPageView> {
  final _pageController = PageController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        children: [
          // Truyền widget con với enum giá trị
          IntroChildPage(
            introPagePosition: IntroPagePosition.page1,
            nextOnPressed: () {
              _pageController.jumpToPage(1);
            },
            backOnPressed: () {}, // Correct enum
          ),
          IntroChildPage(
            introPagePosition: IntroPagePosition.page2,
            nextOnPressed: () {
              // Navigate to the Login
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const Login()),
              );
            },
            backOnPressed: () {
              _pageController.jumpToPage(0);
            },
          ),
        ],
      ),
    );
  }
}
