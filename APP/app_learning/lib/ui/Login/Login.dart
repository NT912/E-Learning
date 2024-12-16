import 'dart:convert';

import 'package:app_learning/ui/homepage/MainPage.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../API/api_service.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<Login> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false;
  bool _isLoading = false;

  void _login() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();

    if (email.isEmpty || password.isEmpty) {
      _showTopSnackBar('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    setState(() => _isLoading = true);

    final apiService = ApiService();

    try {
      final response = await apiService.login(email, password);
      // In lỗi ra tẻminal
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}'); // In ra body phản hồi

      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = jsonDecode(response.body);

        if (data['data']['success']) {
          String token = data['data']['description']['token'];
          print('Login successful. Token: $token');
          await _saveToken(token);

          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const Mainpage()),
          );
        } else {
          _showTopSnackBar('Đăng nhập thất bại: ${data['message']}');
        }
      } else {
        _showTopSnackBar(
            'Lỗi đăng nhập. Mã trạng thái: ${response.statusCode}');
      }
    } catch (e) {
      _showTopSnackBar('Lỗi: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _saveToken(String token) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      bool success = await prefs.setString('auth_token', token);

      if (success) {
        print('Token saved successfully');
      } else {
        _showTopSnackBar('Lỗi khi lưu token.');
      }
    } catch (e) {
      print('Error saving token: $e');
      _showTopSnackBar('Lỗi khi lưu token.');
    }
  }

  Future<String?> _getToken() async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      return prefs.getString('auth_token');
    } catch (e) {
      print('Error retrieving token: $e');
      return null;
    }
  }

  void _showTopSnackBar(String message) {
    final overlay = Overlay.of(context);
    final overlayEntry = OverlayEntry(
      builder: (context) => Positioned(
        top: MediaQuery.of(context).padding.top + 16,
        left: 0,
        right: 0,
        child: Material(
          child: Container(
            color: Colors.red,
            padding: const EdgeInsets.all(16.0),
            child: Text(
              message,
              style: const TextStyle(color: Colors.white),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );

    overlay.insert(overlayEntry);

    Future.delayed(const Duration(seconds: 3), () {
      overlayEntry.remove();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 50.0),
                _buildLogo(),
                const SizedBox(height: 16.0),
                _buildOnboardingTitleAndContent(),
                _buildEmail(),
                _buildPassword(),
                _buildForgotandRegister(),
                _buildbtnLogin(),
                _buildText(),
                _buildIcon(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLogo() {
    return Image.asset(
      "assets/images/login.png",
      width: 95,
      height: 110,
      fit: BoxFit.contain,
    );
  }

  Widget _buildOnboardingTitleAndContent() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 10).copyWith(top: 50),
      child: Column(
        children: [
          const Text(
            'Đăng Nhập !',
            style: TextStyle(
              fontSize: 30.0,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 20),
          Text(
            'Đăng nhập vào tài khoản của bạn để tiếp tục các khóa học',
            style: TextStyle(
              fontSize: 16.0,
              color: Colors.grey[600],
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 20.0),
        ],
      ),
    );
  }

  Widget _buildEmail() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 30).copyWith(top: 50),
      child: TextField(
        controller: _emailController,
        decoration: InputDecoration(
          hintText: 'Email',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12.0),
            borderSide: const BorderSide(
              color: Colors.black,
              width: 2.0,
            ),
          ),
          prefixIcon: const Icon(Icons.email_outlined),
          contentPadding:
              const EdgeInsets.symmetric(vertical: 25.0, horizontal: 15.0),
        ),
      ),
    );
  }

  Widget _buildPassword() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 30).copyWith(top: 20),
      child: TextField(
        controller: _passwordController,
        obscureText: !_isPasswordVisible,
        decoration: InputDecoration(
          hintText: 'Mật khẩu',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12.0),
            borderSide: const BorderSide(
              color: Colors.black,
              width: 5.0,
            ),
          ),
          prefixIcon: const Icon(Icons.lock_outline),
          suffixIcon: IconButton(
            icon: Icon(
              _isPasswordVisible ? Icons.visibility : Icons.visibility_off,
            ),
            onPressed: () {
              setState(() {
                _isPasswordVisible = !_isPasswordVisible;
              });
            },
          ),
          contentPadding:
              const EdgeInsets.symmetric(vertical: 25.0, horizontal: 15.0),
        ),
      ),
    );
  }

  Widget _buildForgotandRegister() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 30).copyWith(top: 30),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          TextButton(
            onPressed: () {
              // Logic for forgot password
            },
            child: const Text('Quên mật khẩu?', style: TextStyle(fontSize: 16)),
          ),
          TextButton(
            onPressed: () {
              // Logic for register account
            },
            child: const Text(
              'Đăng kí tài khoản',
              style: TextStyle(fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildbtnLogin() {
    return Container(
      margin: const EdgeInsets.only(top: 30),
      child: ElevatedButton(
        onPressed: _isLoading ? null : _login,
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.black,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(30.0),
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: 30.0,
            vertical: 14.0,
          ),
        ),
        child: _isLoading
            ? CircularProgressIndicator()
            : const Text(
                'Đăng Nhập',
                style: TextStyle(fontSize: 20.0, color: Colors.white),
              ),
      ),
    );
  }

  Widget _buildText() {
    return Container(
      margin: const EdgeInsets.only(top: 30),
      child: Column(
        children: [
          Text(
            'Tiếp tục với',
            style: TextStyle(fontSize: 14.0, color: Colors.grey[600]),
          ),
          const SizedBox(height: 16.0),
        ],
      ),
    );
  }

  Widget _buildIcon() {
    return Wrap(
      alignment: WrapAlignment.center,
      spacing: 24.0,
      children: [
        IconButton(
          onPressed: () {
            // Logic for Google login
          },
          icon: Image.asset(
            "assets/images/gg_icon.png",
            height: 50.0,
          ),
        ),
        IconButton(
          onPressed: () {
            // Logic for Facebook login
          },
          icon: Image.asset(
            "assets/images/fb_icon.png",
            height: 50.0,
          ),
        ),
        IconButton(
          onPressed: () {
            // Logic for Apple login
          },
          icon: Image.asset(
            "assets/images/ip_icon.png",
            height: 50.0,
          ),
        ),
      ],
    );
  }
}
