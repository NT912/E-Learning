import 'package:flutter/material.dart';

class Course {
  final String title;
  final String price;
  final double rating;
  final bool isFree;
  final String image;

  Course({
    required this.title,
    required this.price,
    required this.rating,
    this.isFree = false,
    required this.image,
  });
}

class SearchResultPage extends StatelessWidget {
  final String query;

  SearchResultPage({super.key, required this.query});

  final List<Course> allCourses = [
    Course(
      title: 'Khóa học C++',
      price: '500.000VNĐ',
      rating: 4.2,
      image: 'assets/images/C.jpg',
    ),
    Course(
      title: 'Khóa học HTML/CSS',
      price: '600.000VNĐ',
      rating: 3.9,
      image: 'assets/images/html_css.jpg',
    ),
    Course(
      title: 'Khóa học Java',
      price: '800.000VNĐ',
      rating: 4.2,
      image: 'assets/images/java.jpg',
    ),
    Course(
      title: 'Web Developer',
      price: '900.000VNĐ',
      rating: 4.9,
      image: 'assets/images/web_dev.jpg',
    ),
    Course(
      title: 'Digital Marketing',
      price: '500.000VNĐ',
      rating: 4.0,
      image: 'assets/images/digital_marketing.jpg',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    // Lọc danh sách khóa học dựa trên từ khóa tìm kiếm
    final filteredCourses = allCourses
        .where((course) =>
            course.title.toLowerCase().contains(query.toLowerCase()))
        .toList();

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text('Kết quả tìm kiếm: $query'),
      ),
      body: filteredCourses.isEmpty
          ? const Center(
              child: Text(
                'Không tìm thấy khóa học nào.',
                style: TextStyle(fontSize: 18),
              ),
            )
          : ListView.builder(
              itemCount: filteredCourses.length,
              itemBuilder: (context, index) {
                return _buildCourseCard(filteredCourses[index]);
              },
            ),
    );
  }

  Widget _buildCourseCard(Course course) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          // Hình ảnh khóa học
          Container(
            width: 150,
            height: 120,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(course.image),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.circular(10),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (course.isFree)
                    const Text(
                      'Miễn phí',
                      style: TextStyle(
                        color: Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  Text(
                    course.title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    course.price,
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 5),
                  Row(
                    children: [
                      const Icon(Icons.star, color: Colors.amber, size: 20),
                      Text('${course.rating}'),
                    ],
                  ),
                ],
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.bookmark_border),
            onPressed: () {
              // Thêm hành động khi nhấn bookmark
            },
          ),
        ],
      ),
    );
  }
}
