import 'package:flutter/material.dart';

import '../../API/api_service.dart';
import '../../model/Course.dart';
import '../homepage/SingleCourseDetails.dart';

class CoursePage extends StatefulWidget {
  @override
  _CoursePageState createState() => _CoursePageState();
}

class _CoursePageState extends State<CoursePage> {
  late Future<List<Course>> coursesFuture;
  final ApiService apiService = ApiService(); // Assuming ApiService is defined

  // @override
  // void initState() {
  //   super.initState();
  //   coursesFuture = apiService.getCourses(); // Fetch courses from API
  // }
  @override
  void initState() {
    super.initState();
    coursesFuture = apiService.getCourses().then((courses) {
      print(courses); // In ra danh sách khóa học
      return courses;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Khóa Học Của Tôi"),
        backgroundColor: Colors.blue,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // Search functionality here
            },
          ),
        ],
      ),
      body: FutureBuilder<List<Course>>(
        future: coursesFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text("No courses available"));
          } else {
            final courses = snapshot.data!;

            return ListView.builder(
              itemCount: courses.length,
              itemBuilder: (context, index) {
                var course = courses[index];
                return InkWell(
                  onTap: () {
                    print(
                        'Course ID: ${course.id}'); // Kiểm tra ID khi nhấn vào khóa học
                    if (course.id != null && course.id != 0) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => SingleCourseDetailsPage(
                            courseId: course
                                .id, // Truyền ID khóa học vào trang chi tiết
                          ),
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('ID khóa học không hợp lệ')),
                      );
                    }
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Course Name and Avatar
                        Row(
                          children: [
                            // Handling nullable avatar safely
                            CircleAvatar(
                              radius: 30,
                              backgroundImage: course.avatar != null &&
                                      course.avatar!.isNotEmpty
                                  ? NetworkImage(course.avatar!)
                                  : null,
                              child: course.avatar == null ||
                                      course.avatar!.isEmpty
                                  ? const Icon(Icons.account_circle)
                                  : null,
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: Text(
                                course.name ?? 'Đang cập nhật',
                                // Handling nullable name
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const Divider(),
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
