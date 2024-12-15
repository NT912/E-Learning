import 'dart:convert';

import 'package:http/http.dart' as http;

import '../model/Course.dart';
// import '../ui/Course/Lesson.dart';
import '../ui/category/ListCategory.dart';

class ApiService {
  final String baseUrl =
      'https://6c01-2405-4802-6f09-1190-496-eb0f-16a2-b48a.ngrok-free.app';

  // API đăng nhập
  Future<http.Response> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/auth/login');
    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      return response;
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // danh sách khóa học
  Future<List<Course>> getCourses() async {
    final url = Uri.parse('$baseUrl/course/getall');

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as List<dynamic>;

        // Lặp qua danh sách và bổ sung đường dẫn base cho ảnh nếu cần
        return data.map((json) {
          // Nếu avatar là đường dẫn tương đối, bạn cần thêm base URL vào
          String? avatar = json['avatar'];
          if (avatar != null && !avatar.startsWith('http')) {
            avatar = '$baseUrl$avatar';
          }
          return Course.fromJson(
              {'name': json['name'], 'avatar': avatar, 'cost': json['cost']});
        }).toList();
      } else {
        throw Exception(
            'Lỗi khi lấy dữ liệu. Mã trạng thái: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Lỗi: $e');
    }
  }

  // Lấy danh sách Category từ API và trả về danh sách Category
  Future<List<ListCategory>> getCategoryIDs(List<int> ids) async {
    List<ListCategory> categories = [];

    for (int id in ids) {
      final url = Uri.parse('$baseUrl/course/category/$id');
      try {
        final response =
            await http.get(url).timeout(const Duration(seconds: 10));

        if (response.statusCode == 200) {
          final Map<String, dynamic> categoryJson = jsonDecode(response.body);
          // Tạo đối tượng Category từ JSON và thêm vào danh sách
          categories.add(ListCategory.fromJson(categoryJson));
        } else {
          throw Exception(
              'Failed to load category $id: ${response.statusCode}');
        }
      } catch (e) {
        throw Exception('Failed to load category $id: $e');
      }
    }

    return categories;
  }

  // Lấy thông tin khóa học từ API
  Future<Course> getCourseDetails(int courseID) async {
    final url = Uri.parse('$baseUrl/course/$courseID');
    try {
      final response = await http.get(url).timeout(const Duration(seconds: 10));

      if (response.statusCode == 200) {
        final Map<String, dynamic> courseJson = jsonDecode(response.body);
        // Tạo đối tượng Course từ JSON
        return Course.fromJson(courseJson);
      } else {
        throw Exception(
            'Failed to load course $courseID: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load course $courseID: $e');
    }
  }
}
