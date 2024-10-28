import 'package:app_learning/ui/homepage/MainPage.dart';
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<Login> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isPasswordVisible = false; // Biến để kiểm soát hiển thị mật khẩu

  void _login() {
    String email = _emailController.text;
    String password = _passwordController.text;

    // Giả định tài khoản và mật khẩu đúng là:
    String correctEmail = "bao@gmail.com";
    String correctPassword = "bao123";

    if (email == correctEmail && password == correctPassword) {
      // Chuyển hướng đến trang HomePage
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const Mainpage()),
      );
    } else {
      // Hiển thị thông báo lỗi nếu đăng nhập không thành công
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Tài khoản hoặc mật khẩu không đúng!'),
        ),
      );
    }
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
                SizedBox(height: 50.0),
                _buildLogologin(),
                SizedBox(height: 16.0),
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

  Widget _buildLogologin() {
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
              color: Colors.black, // Màu sắc của viền
              width: 2.0, // Độ dày của viền
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
        obscureText: !_isPasswordVisible, // Ẩn/hiện mật khẩu
        decoration: InputDecoration(
          hintText: 'Mật khẩu',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12.0),
            borderSide: const BorderSide(
              color: Colors.black, // Màu sắc của viền
              width: 5.0, // Độ dày của viền
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
              // Thêm logic Quên mật khẩu
            },
            child: const Text('Quên mật khẩu?', style: TextStyle(fontSize: 16)),
          ),
          TextButton(
            onPressed: () {
              // Thêm logic Đăng ký tài khoản
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
      margin: EdgeInsets.only(top: 30),
      child: ElevatedButton(
        onPressed: _login,
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
        child: const Text(
          'Đăng Nhập',
          style: TextStyle(fontSize: 20.0, color: Colors.white),
        ),
      ),
    );
  }

  Widget _buildText() {
    return Container(
      margin: EdgeInsets.only(top: 30),
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
            // Google login logic
          },
          icon: Image.asset(
            "assets/images/gg_icon.png",
            height: 50.0,
          ),
        ),
        IconButton(
          onPressed: () {
            // Facebook login logic
          },
          icon: Image.asset(
            "assets/images/fb_icon.png",
            height: 50.0,
          ),
        ),
        IconButton(
          onPressed: () {
            // Apple login logic
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
