import 'package:app_learning/ui/profile/mainprofile.dart';
import 'package:flutter/material.dart';

class TermsAndConditionsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Điều khoản và Điều kiện'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.blue),
          onPressed: () {
            // Điều hướng đến ProfilePage thay vì quay lại trang trước
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => ProfilePage()),
            );
          },
        ),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Tiêu đề và mô tả ngắn
            Text(
              'Điều khoản và Điều kiện',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10),
            Text(
              'Vui lòng đọc kỹ các điều khoản và điều kiện trước khi sử dụng ứng dụng.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
            SizedBox(height: 20),

            // Nội dung điều khoản
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '1. Điều khoản sử dụng dịch vụ:',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      style: TextStyle(fontSize: 14),
                    ),
                    SizedBox(height: 20),
                    Text(
                      '2. Quyền và nghĩa vụ của người dùng:',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      style: TextStyle(fontSize: 14),
                    ),
                    SizedBox(height: 20),
                    Text(
                      '3. Điều khoản bảo mật:',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                      style: TextStyle(fontSize: 14),
                    ),
                    SizedBox(height: 20),

                    // Thêm điều khoản khác ở đây nếu cần
                  ],
                ),
              ),
            ),

            // Nút "Đồng ý"
            ElevatedButton(
              onPressed: () {
                // Hành động khi người dùng đồng ý
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Bạn đã đồng ý với điều khoản')),
                );
              },
              child: Text('Đồng ý'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue, // Màu nền của nút
                padding: EdgeInsets.symmetric(vertical: 15, horizontal: 80),
                textStyle: TextStyle(fontSize: 16),
              ),
            ),
            SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
