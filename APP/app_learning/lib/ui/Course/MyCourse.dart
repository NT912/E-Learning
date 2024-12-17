import 'package:app_learning/ui/homepage/MainPage.dart';
import 'package:flutter/material.dart';

import '../../API/api_service.dart';
import '../../model/Course.dart';
import '../homepage/SearchPage.dart';
import 'list.dart';

class MyCourse extends StatefulWidget {
  @override
  _CourseListPageState createState() => _CourseListPageState();
}

class _CourseListPageState extends State<MyCourse>
    with SingleTickerProviderStateMixin {
  late Future<List<Course>> _courses;
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _courses = ApiService().getCourses();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back,
            size: 27,
          ),
          onPressed: () {
            // Điều hướng đến trang SearchPage
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => Mainpage(),
              ),
            );
          },
        ),
        title: const Text('Khóa Học Đã Mua',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.search,
              size: 27,
            ),
            onPressed: () {
              // Điều hướng đến trang SearchPage
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const SearchPage(),
                ),
              );
            },
          ),
        ],
      ),
      body: FutureBuilder<List<Course>>(
        future: _courses,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Lỗi: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('Không có khóa học nào.'));
          } else {
            List<Course> courses = snapshot.data!;
            return ListView.builder(
              padding: const EdgeInsets.all(8.0),
              itemCount: courses.length,
              itemBuilder: (context, index) {
                final course = courses[index];
                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            CourseContents(courseId: course.id),
                      ),
                    );
                  },
                  child: Card(
                    margin: const EdgeInsets.symmetric(vertical: 8.0),
                    color: Colors.white,
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(10),
                            bottomLeft: Radius.circular(10),
                          ),
                          child: Image.network(
                            course.avatar ?? '',
                            fit: BoxFit.cover,
                            height: 150,
                            width: 150,
                            errorBuilder: (context, error, stackTrace) {
                              return const Icon(Icons.error,
                                  color: Colors.red, size: 50);
                            },
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(8),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  course.name ?? 'Đang cập nhật',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  'Khóa học lập trình ${course.name}',
                                  style: const TextStyle(
                                    fontSize: 14,
                                  ),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                Row(
                                  children: [
                                    const Icon(Icons.star,
                                        color: Colors.amber, size: 16),
                                    const SizedBox(width: 8),
                                    Text(
                                      course.rating?.toString() ?? '0.0',
                                      style: const TextStyle(fontSize: 14),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 8),
                                // const Text(
                                //   'Vào Học',
                                //   style: TextStyle(
                                //       fontSize: 14,
                                //       color: Colors.blue,
                                //       fontWeight: FontWeight.bold),
                                // ),
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
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
