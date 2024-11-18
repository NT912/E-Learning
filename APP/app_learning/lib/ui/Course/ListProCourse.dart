import 'package:flutter/material.dart';

class Course {
  final String title;
  final String price;
  final double rating;
  final bool isFree;
  final String image; // Thêm trường image cho ảnh của khóa học

  Course({
    required this.title,
    required this.price,
    required this.rating,
    this.isFree = false,
    required this.image, // Thêm tham số image vào constructor
  });
}

class ListFroCourse extends StatefulWidget {
  const ListFroCourse({super.key});

  @override
  _FroCourseState createState() => _FroCourseState();
}

class _FroCourseState extends State<ListFroCourse> {
  int selectedCategoryIndex = 0;
  final List<Course> courses = [
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
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Khóa học miễn phí'),
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
            width: 180,
            height: 150,
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
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (course.isFree)
                    const Text(
                      'Programming',
                      style: TextStyle(
                        color: Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  Text(
                    course.title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                  Text(
                    course.price,
                    style: const TextStyle(
                      color: Colors.blue,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                  Row(
                    children: [
                      const Icon(Icons.star, color: Colors.amber, size: 30),
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
