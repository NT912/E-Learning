import 'package:app_learning/ui/profile/mainprofile.dart';
import 'package:flutter/material.dart';

class EditProfilePage extends StatefulWidget {
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController nameController = TextEditingController();
  TextEditingController dobController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  String? gender;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sửa trang cá nhân'),
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
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                // Avatar và nút chỉnh sửa
                CircleAvatar(
                  radius: 60,
                  backgroundColor: Colors.grey.shade300,
                  child: Icon(Icons.person, size: 60, color: Colors.white),
                ),
                SizedBox(height: 10),
                IconButton(
                  icon: Icon(Icons.edit, color: Colors.teal),
                  onPressed: () {
                    // Hành động chỉnh sửa ảnh
                  },
                ),
                SizedBox(height: 20),

                // Trường "Họ và tên"
                TextFormField(
                  controller: nameController,
                  decoration: InputDecoration(
                    labelText: 'Họ và tên',
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Vui lòng nhập họ và tên';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 10),

                // Trường "Ngày sinh"
                TextFormField(
                  controller: dobController,
                  decoration: InputDecoration(
                    labelText: 'Ngày sinh',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.calendar_today),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Vui lòng nhập ngày sinh';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 10),

                // Trường "Email"
                TextFormField(
                  controller: emailController,
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.email),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Vui lòng nhập email';
                    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
                        .hasMatch(value)) {
                      return 'Vui lòng nhập email hợp lệ';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 10),

                // Trường "Số điện thoại"
                TextFormField(
                  controller: phoneController,
                  decoration: InputDecoration(
                    labelText: 'Số điện thoại',
                    border: OutlineInputBorder(),
                    suffixIcon: Icon(Icons.phone),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Vui lòng nhập số điện thoại';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 10),

                // Trường "Giới tính"
                DropdownButtonFormField<String>(
                  value: gender,
                  decoration: InputDecoration(
                    labelText: 'Giới tính',
                    border: OutlineInputBorder(),
                  ),
                  items: ['Nam', 'Nữ', 'Khác']
                      .map((genderOption) => DropdownMenuItem<String>(
                            value: genderOption,
                            child: Text(genderOption),
                          ))
                      .toList(),
                  onChanged: (value) {
                    setState(() {
                      gender = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Vui lòng chọn giới tính';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 20),

                // Nút "Cập nhật"
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState?.validate() ?? false) {
                      // Xử lý cập nhật thông tin ở đây
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Cập nhật thành công')),
                      );
                    }
                  },
                  child: Text('Cập nhật'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    // Sử dụng backgroundColor thay vì primary
                    padding: EdgeInsets.symmetric(vertical: 15, horizontal: 80),
                    textStyle: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
