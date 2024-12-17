import 'package:app_learning/ui/profile/legacy.dart'; // Import trang TermsAndConditionsPage
import 'package:app_learning/ui/profile/payment.dart';
import 'package:app_learning/ui/profile/updateprofile.dart'; // Import trang EditProfilePage
import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Trang cá nhân',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Avatar và thông tin cá nhân
            SizedBox(height: 20),
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 60,
                    backgroundColor: Colors.grey.shade300,
                    child: const Icon(
                      Icons.person,
                      size: 60,
                      color: Colors.white,
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: Colors.teal,
                        borderRadius: BorderRadius.circular(50),
                        border: Border.all(color: Colors.white, width: 2),
                      ),
                      child: Icon(Icons.camera_alt, color: Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'Baoo',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const Text(
              'bao@gmail.com',
              style: TextStyle(color: Colors.grey),
            ),
            SizedBox(height: 20),

            // Danh sách các lựa chọn
            buildOption(context, Icons.edit, "Sửa trang cá nhân", onTap: () {
              // Chuyển sang trang EditProfilePage
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => EditProfilePage()),
              );
            }),

            buildOption(context, Icons.payment, "Tùy chọn thanh toán",
                onTap: () {
              // Chuyển sang trang EditProfilePage
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => AddPaymentMethodPage()),
              );
            }),

            buildOption(context, Icons.description, "Điều khoản & Điều kiện",
                onTap: () {
              // Chuyển sang trang TermsAndConditionsPage
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => TermsAndConditionsPage()),
              );
            }),

            buildOption(context, Icons.help, "Help Center"),
            buildOption(context, Icons.logout, "Logout"),
          ],
        ),
      ),
    );
  }

  // Widget xây dựng từng mục chọn
  Widget buildOption(BuildContext context, IconData icon, String title,
      {void Function()? onTap}) {
    return ListTile(
      leading: Icon(icon, color: Colors.black54),
      title: Text(title, style: const TextStyle(fontSize: 16)),
      trailing:
          const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.black54),
      onTap: onTap, // Đặt hành động vào đây
    );
  }
}
