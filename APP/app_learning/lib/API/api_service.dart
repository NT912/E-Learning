import 'dart:convert';

import 'package:http/http.dart' as http;

import '../ui/Course/Lesson.dart';
import '../ui/category/ListCategory.dart';

class ApiService {
  final String baseUrl = 'https://97b6-118-71-221-87.ngrok-free.app';

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
