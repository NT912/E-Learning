import 'package:app_learning/ui/Course/MyCourse.dart';
import 'package:flutter/material.dart';

import '../../API/api_service.dart';
import '../../video/YouTubePlayerScreen.dart';
import '../homepage/SearchPage.dart';

class CourseContents extends StatefulWidget {
  final int courseId; // Course ID passed to the page

  const CourseContents({Key? key, required this.courseId}) : super(key: key);

  @override
  _CourseContentsState createState() => _CourseContentsState();
}

class _CourseContentsState extends State<CourseContents> {
  late Future<Map<String, dynamic>> courseDetailsFuture;
  final ApiService apiService = ApiService();

  @override
  void initState() {
    super.initState();
    courseDetailsFuture = apiService.getCourseDetails(widget.courseId);
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
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => MyCourse(),
              ),
            );
          },
        ),
        title: const Text('Nội Dung Khóa Học',
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
      body: FutureBuilder<Map<String, dynamic>>(
        future: courseDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final courseDetails = snapshot.data!;
            final String courseName = courseDetails['Name'] ?? 'Course Name';
            final String description =
                courseDetails['Description'] ?? 'No description available';
            final String avatar =
                courseDetails['avatar'] ?? 'assets/images/java.jpg';
            final int cost = courseDetails['Cost'] ?? 0;
            final List chapters = courseDetails['chapters'] ?? [];

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image Section
                // Image Section

                // Course Details Section
                // Tab Bar Section
                Expanded(
                  child: DefaultTabController(
                    length: 1, // Chỉ còn 1 tab
                    child: Column(
                      children: [
                        Expanded(
                          child: TabBarView(
                            children: [
                              // Curriculum Tab
                              ListView.builder(
                                padding: const EdgeInsets.all(16.0),
                                itemCount: chapters.length,
                                itemBuilder: (context, index) {
                                  final chapter = chapters[index];
                                  final lessons =
                                      chapter['lessons'] as List<dynamic>? ??
                                          [];

                                  return CurriculumItem(
                                    section: "Section ${index + 1}",
                                    title: chapter['Title'] ?? 'Chapter Title',
                                    duration: lessons.isEmpty
                                        ? 'No Lessons'
                                        : '${lessons.length} Lessons',
                                    lessons: lessons.map<Map<String, String>>(
                                      (lesson) {
                                        return {
                                          "title": lesson['Title'] ?? '',
                                          "time":
                                              "${lesson['Duration'] ?? 0} Mins",
                                          "link": lesson['Link'] ?? ''
                                        };
                                      },
                                    ).toList(),
                                  );
                                },
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // Enroll Button
              ],
            );
          }
        },
      ),
    );
  }
}

class CurriculumItem extends StatelessWidget {
  final String section;
  final String title;
  final String duration;
  final List<Map<String, String>> lessons;

  const CurriculumItem({
    Key? key,
    required this.section,
    required this.title,
    required this.duration,
    required this.lessons,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "$section - $title",
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 24,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          duration,
          style: TextStyle(fontSize: 20),
        ),
        const SizedBox(height: 16),
        ...lessons.map((lesson) {
          return ListTile(
            contentPadding: EdgeInsets.zero,
            leading: IconButton(
              icon: const Icon(Icons.play_circle_fill,
                  color: Colors.blue, size: 30),
              onPressed: () {
                // Xử lý khi người dùng nhấn vào nút play
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        YouTubePlayerScreen(youtubeUrl: lesson['link']!),
                  ),
                );
              },
            ),
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Text(
                  lesson['title']!,
                  style: TextStyle(fontSize: 20),
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }
}
