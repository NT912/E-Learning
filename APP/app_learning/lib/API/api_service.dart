import 'dart:convert';

import 'package:http/http.dart' as http;

import '../model/Course.dart';
// import '../ui/Course/Lesson.dart';
import '../ui/category/ListCategory.dart';

class ApiService {
  final String baseUrl = 'https://f663-42-118-114-11.ngrok-free.app';

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

  // API lấy ất cả khóa học
  Future<List<Course>> getCourses() async {
    final url = Uri.parse('$baseUrl/course/getall');

    try {
      final response = await http.get(url);

      print('Response body: ${response.body}'); // In ra phản hồi từ API

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body) as List<dynamic>;

        return data.map((json) {
          // Đảm bảo xử lý trường avatar null an toàn
          String? avatar = json['avatar'];
          if (avatar != null &&
              avatar.isNotEmpty &&
              !avatar.startsWith('http')) {
            avatar = '$baseUrl$avatar';
          } else {
            avatar = ''; // Gán giá trị mặc định nếu avatar là null hoặc rỗng
          }

          String name = json['name'] ??
              'Unknown'; // Nếu name null thì gán giá trị mặc định là 'Unknown'
          int courseId = json['courseID'] ?? 0; // Đảm bảo courseID không null

          // In ra giá trị ID để kiểm tra
          print('Course ID: $courseId');

          return Course.fromJson({
            'name': name,
            'avatar': avatar,
            'cost': json['cost'],
            'id': courseId
          });
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

  // Fetch all courses
  Future<List<dynamic>> getAllCourses() async {
    final url = Uri.parse('$baseUrl/course');
    try {
      final response =
          await http.get(url, headers: {'Content-Type': 'application/json'});

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load courses: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

// Lấy chi tiết khóa học theo ID
  Future<Map<String, dynamic>> getCourseDetails(int courseId) async {
    final url = Uri.parse('$baseUrl/course/$courseId');

    try {
      final response =
          await http.get(url, headers: {'Content-Type': 'application/json'});

      if (response.statusCode == 200) {
        // Giải mã JSON từ response.body
        final Map<String, dynamic> json = jsonDecode(response.body);

        // Kiểm tra và xử lý avatar
        String? avatar = json['avatar'];
        if (avatar != null && !avatar.startsWith('http')) {
          avatar = '$baseUrl$avatar';
          json['avatar'] = avatar; // Cập nhật avatar trong json
        }

        return json; // Trả về dữ liệu đã được cập nhật
      } else {
        // Kiểm tra các lỗi phổ biến và cung cấp thông tin chi tiết
        if (response.statusCode == 400) {
          throw Exception('Bad Request: Tham số yêu cầu không hợp lệ');
        } else if (response.statusCode == 404) {
          throw Exception('Không tìm thấy khóa học');
        } else {
          throw Exception('Lỗi khi tải khóa học: ${response.statusCode}');
        }
      }
    } catch (e) {
      // Xử lý lỗi bất kỳ trong quá trình thực hiện HTTP
      throw Exception('Lỗi kết nối hoặc lỗi hệ thống: $e');
    }
  }

  // Chương trình học
  Future<List<dynamic>> getChapters(int courseId) async {
    final url = Uri.parse('$baseUrl/course/$courseId/chapters');
    try {
      final response =
          await http.get(url, headers: {'Content-Type': 'application/json'});

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load chapters: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  // bài học của một chương
  Future<List<dynamic>> getLessons(int chapterId) async {
    final url = Uri.parse('$baseUrl/chapter/$chapterId/lessons');
    try {
      final response =
          await http.get(url, headers: {'Content-Type': 'application/json'});

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load lessons: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}
