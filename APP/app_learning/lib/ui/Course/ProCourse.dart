import 'package:flutter/material.dart';

class Course {
  final String title;
  final String price;
  final double rating;
  final bool isFree;

  Course({
    required this.title,
    required this.price,
    required this.rating,
    this.isFree = false,
  });
}

class FroCourse extends StatefulWidget {
  const FroCourse({super.key});

  @override
  _FroCourseState createState() => _FroCourseState();
}

class _FroCourseState extends State<FroCourse> {
  int selectedCategoryIndex = 0;

  final List<Course> courses = [
    Course(
      title: 'C++ OOP',
      price: '700.00 VNĐ',
      rating: 4.2,
    ),
    Course(
      title: 'HTML/CSS Pro',
      price: '1.000.000 VNĐ',
      rating: 3.9,
    ),
    Course(
      title: 'Graphic Design Advanced',
      price: '500.000 VNĐ',
      rating: 4.2,
    ),
    Course(
      title: 'Web Developer',
      price: '600.000 VNĐ',
      rating: 4.9,
    ),
    Course(
      title: 'Digital Marketing',
      price: '200.000VNĐ',
      rating: 4.0,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Khóa học Pro'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Categories
          _buildCategoryScrollView(),
          // Course List
          Expanded(
            child: ListView.builder(
              itemCount: courses.length,
              itemBuilder: (context, index) => _buildCourseCard(courses[index]),
            ),
          ),
          // Bottom Navigation
        ],
      ),
    );
  }

  Widget _buildCategoryScrollView() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          _buildCategoryChip('All', selectedCategoryIndex == 0, 0),
          _buildCategoryChip('Graphic Design', selectedCategoryIndex == 1, 1),
          _buildCategoryChip('3D Design', selectedCategoryIndex == 2, 2),
          _buildCategoryChip('Arts & Design', selectedCategoryIndex == 3, 3),
        ],
      ),
    );
  }

  Widget _buildCategoryChip(String label, bool isSelected, int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          selectedCategoryIndex = index;
        });
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        child: Chip(
          label: Text(
            label,
            style: TextStyle(
              color: isSelected ? Colors.white : Colors.black,
            ),
          ),
          backgroundColor: isSelected ? Colors.blue : Colors.white,
        ),
      ),
    );
  }

  Widget _buildCourseCard(Course course) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          // Course Thumbnail
          Container(
            width: 150,
            height: 150,
            color: Colors.grey[300],
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (course.isFree)
                    const Text(
                      'Programing',
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
                  Text(
                    course.price,
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Row(
                    children: [
                      const Icon(Icons.star, color: Colors.amber, size: 16),
                      Text(' ${course.rating}    '),
                    ],
                  ),
                ],
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.bookmark_border),
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}
