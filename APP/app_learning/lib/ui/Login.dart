import 'package:app_learning/ui/intro/intro_page_view.dart';
import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: _buildBodyPage(context),
      ),
    );
  }

  Widget _buildBodyPage(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildLogo(),
          const SizedBox(height: 30),
          _buildText(),
          const SizedBox(height: 20),
          _buildButton(context), // Thêm button để chuyển trang
        ],
      ),
    );
  }

  Widget _buildText() {
    return const Padding(
      padding: EdgeInsets.all(40.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            "Học trực tuyến",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 10),
          Text(
            "Chúng tôi cung cấp các lớp học trực tuyến và các bài giảng được ghi âm trước!",
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildButton(BuildContext context) {
    return ElevatedButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const IntroPageView()),
          );
        },
        child: const Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Text('Next'),
          ],
        ));
  }
}

Widget _buildLogo() {
  return Image.asset(
    "assets/images/logo.png",
    width: 330,
    height: 330,
    fit: BoxFit.contain,
  );
}
