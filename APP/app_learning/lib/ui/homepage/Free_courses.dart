import 'package:app_learning/ui/Course/ListFreeCourse.dart';
import 'package:flutter/material.dart';

class FreeCoursesHome extends StatelessWidget {
  const FreeCoursesHome({super.key});

  @override
  Widget build(BuildContext context) {
    // Danh sách khóa học miễn phí
    final froCourses = [
      {
        'name': 'Khóa học BootCamp',
        'author': 'Bão',
        'price': 'Miễn phí',
        'rating': 4.2,
        'image': 'assets/images/php.jpg',
      },
      {
        'name': 'Khóa học React',
        'author': 'Online Web Academy',
        'price': 'Miễn phí',
        'rating': 4.7,
        'image': 'assets/images/react.png',
      },
      {
        'name': 'Khóa học Java',
        'author': 'Code Studio',
        'price': 'Miễn phí',
        'rating': 3.8,
        'image': 'assets/images/java.jpg',
      },
      {
        'name': 'Khóa học PHP',
        'author': 'Code Studio',
        'price': 'Miễn Phí',
        'rating': 4.1,
        'image': 'assets/images/php.jpg',
      },
    ];

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Khóa học Pree",
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
              InkWell(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const FreeCourse(),
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
          const SizedBox(height: 10),
          SizedBox(
            height: 250,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: froCourses.length,
              itemBuilder: (context, index) {
                final course = froCourses[index];
                return _buildCourseCard(
                  course['name'] as String,
                  course['author'] as String,
                  course['price'] as String,
                  course['image'] as String,
                  rating: course['rating'] as double,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCourseCard(
    String courseName,
    String author,
    String price,
    String imagePath, {
    double rating = 0.0,
  }) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 10),
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 2,
            blurRadius: 5,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.asset(
              imagePath,
              height: 150,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            courseName,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(Icons.person, size: 16, color: Colors.blue),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  author,
                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          // Phần đánh giá sao và rating
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.star, color: Colors.amber, size: 16),
                  const SizedBox(width: 4),
                  Text(
                    '${rating.toStringAsFixed(1)}',
                    style: const TextStyle(fontSize: 14),
                  ),
                ],
              ),
              Text(
                price,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
