import 'package:app_learning/ui/category/category.dart';
import 'package:app_learning/ui/homepage/Free_courses.dart';
import 'package:app_learning/ui/homepage/course_search.dart';
import 'package:app_learning/ui/homepage/search_result_page.dart';
import 'package:flutter/material.dart';

import '../../API/api_service.dart';
import '../category/ListCategory.dart';
import 'Pro_courses.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ApiService apiService = ApiService(); // Khởi tạo ApiService

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildGreetingSection(),
              const SizedBox(height: 40),
              CourseSearch(
                onSearch: (query) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => SearchResultPage(
                        query: query,
                      ),
                    ),
                  );
                },
              ),

              const SizedBox(height: 16),
              _buildBanner(),
              const SizedBox(height: 30),
              const FreeCoursesHome(),
              const SizedBox(height: 30),
              const FroCoursesHome(),
              const SizedBox(height: 30),
              _buildCourseCategories(), // Truyền dữ liệu vào hàm
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildGreetingSection() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Chào, Bão',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text('Bạn muốn học gì hôm nay? Tìm kiếm bên dưới.'),
          ],
        ),
        IconButton(
          icon: const Icon(Icons.notifications),
          onPressed: () {
            // Hành động khi nhấn nút thông báo
          },
        ),
      ],
    );
  }

  Widget _buildBanner() {
    return Container(
      padding: const EdgeInsets.all(30),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(10),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'GIẢM GIÁ 25%',
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
          SizedBox(height: 4),
          Text(
            'Đặc biệt hôm nay',
            style: TextStyle(color: Colors.white, fontSize: 24),
          ),
          SizedBox(height: 4),
          Text(
            'Được giảm giá cho mỗi đơn đặt hàng khóa học chỉ có hiệu lực trong hôm nay!',
            style: TextStyle(color: Colors.white),
          ),
        ],
      ),
    );
  }

  Widget _buildCourseCategories() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Thể loại',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => Category1(),
                  ),
                );
              },
              child: const Text(
                'Xem thêm',
                style: TextStyle(fontSize: 16, color: Colors.blue),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Sử dụng FutureBuilder để hiển thị danh sách thể loại
        FutureBuilder<List<ListCategory>>(
          future: apiService.getCategoryIDs([1, 2, 3, 4, 5]),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text('No categories available.'));
            } else {
              final categoryList = snapshot.data!;
              return Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: List.generate(
                  categoryList.length,
                  (index) => Text(
                    categoryList[index].name,
                    style: const TextStyle(
                        fontSize: 20,
                        // Kích thước chữ
                        color: Colors.black // Màu chữ
                        ),
                  ),
                ),
              );
            }
          },
        ),
      ],
    );
  }
}
