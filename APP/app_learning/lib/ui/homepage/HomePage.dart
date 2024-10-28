import 'package:flutter/material.dart';
import 'package:app_learning/ui/category/category.dart';
import '../Course/FreeCourse.dart';
import '../Course/ProCourse.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
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
            _buildSearchBar(),
            const SizedBox(height: 16),
            _buildBanner(),
            const SizedBox(height: 30),
            _buildCourseCategories(),
            const SizedBox(height: 30),
            _buildFreeCourses(),
            const SizedBox(height: 30),
            _buildProCourses(),
          ],
        ),
      )),
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

  Widget _buildSearchBar() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search for..',
        prefixIcon: const Icon(Icons.search),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
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
                    builder: (context) => Category(),
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
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text('3D Design'),
            Text('Arts & Humanities'),
            Text('Graphic Design'),
          ],
        ),
      ],
    );
  }

  Widget _buildFreeCourses() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Khóa học miễn phí',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => FreeCourse(),
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
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildCourseCard('React', 'Miễn phí'),
              const SizedBox(width: 8),
              _buildCourseCard('PHP', 'Miễn phí'),
              const SizedBox(width: 8),
              _buildCourseCard('Java', 'Miễn phí'),
              const SizedBox(width: 20),
              _buildCourseCard('Flutter', 'Miễn phí'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildProCourses() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'Khóa học Pro',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => FroCourse(),
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
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              _buildCourseCard('React', '500,000 VND'),
              const SizedBox(width: 8),
              _buildCourseCard('PHP', '600,000 VND'),
              const SizedBox(width: 8),
              _buildCourseCard('Java', '700,000 VND'),
              const SizedBox(width: 20),
              _buildCourseCard('Flutter', '800,000 VND'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCourseCard(String title, String price) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.asset(
            'assets/images/login.png',
            height: 200,
            width: 200,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(title,
                style:
                    const TextStyle(fontSize: 26, fontWeight: FontWeight.bold)),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 8.0, bottom: 8.0),
            child: Text(price, style: const TextStyle(fontSize: 18)),
          ),
        ],
      ),
    );
  }
}
