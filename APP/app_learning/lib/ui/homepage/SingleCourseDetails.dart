import 'package:flutter/material.dart';
import 'package:readmore/readmore.dart';

import '../../API/api_service.dart';
import '../../video/YouTubePlayerScreen.dart';

class SingleCourseDetailsPage extends StatefulWidget {
  final int courseId; // Course ID passed to the page

  const SingleCourseDetailsPage({Key? key, required this.courseId})
      : super(key: key);

  @override
  _SingleCourseDetailsPageState createState() =>
      _SingleCourseDetailsPageState();
}

class _SingleCourseDetailsPageState extends State<SingleCourseDetailsPage> {
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
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
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
                avatar != null && avatar.isNotEmpty
                    ? Image.network(
                        avatar.startsWith('/public')
                            ? 'https://7cbb-42-118-114-11.ngrok-free.app$avatar' // Adjust base URL as needed
                            : avatar,
                        width: double.infinity,
                        height: 250,
                        fit: BoxFit.cover,
                      )
                    : Image.asset(
                        'assets/images/java.jpg',
                        // Placeholder if avatar is null or empty
                        width: double.infinity,
                        height: 250,
                        fit: BoxFit.cover,
                      ),
                const SizedBox(height: 16),

                // Course Details Section
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            courseName,
                            style: const TextStyle(
                              color: Colors.orange,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            courseName,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              const Row(
                                children: [
                                  Icon(Icons.people, size: 16),
                                  SizedBox(width: 4),
                                  Text("21 Class"),
                                ],
                              ),
                              const Row(
                                children: [
                                  Icon(Icons.timer, size: 16),
                                  SizedBox(width: 4),
                                  Text("42 Hours"),
                                ],
                              ),
                              Row(
                                children: List.generate(
                                  5, // Số lượng ngôi sao
                                  (index) => const Icon(
                                    Icons.star,
                                    color: Colors.yellow, // Màu ngôi sao
                                    size: 16, // Kích thước ngôi sao
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),

                // Tab Bar Section
                Expanded(
                  child: DefaultTabController(
                    length: 2,
                    child: Column(
                      children: [
                        const TabBar(
                          labelColor: Colors.black,
                          indicatorColor: Colors.blue,
                          tabs: [
                            Tab(text: "GIỚI THIỆU"),
                            Tab(text: "CHƯƠNG TRÌNH"),
                          ],
                        ),
                        Expanded(
                          child: TabBarView(
                            children: [
                              // Introduction Tab
                              Padding(
                                padding: const EdgeInsets.all(16.0),
                                child: ReadMoreText(
                                  description,
                                  trimLines: 3,
                                  style: const TextStyle(fontSize: 16),
                                  colorClickableText: Colors.blue,
                                ),
                              ),

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
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                    ),
                    onPressed: () {
                      // Handle Enroll Action
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          cost > 0 ? "Mua ngay - $cost VNĐ" : "Học miễn phí",
                          style: const TextStyle(
                              fontSize: 20, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                ),
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
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 4),
        Text(duration),
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
                Text(lesson['title']!),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }
}
