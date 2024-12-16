import 'package:flutter/material.dart';

import '../model/test.dart';
import '../video/YouTubePlayerScreen.dart';
import 'api_service.dart';

class CourseDetailScreen extends StatelessWidget {
  final int courseId;

  CourseDetailScreen({required this.courseId});

  Future<Course> fetchCourseDetails(int courseId) async {
    final apiService = ApiService();
    final response = await apiService.getCourseDetails(courseId);
    return Course.fromJson(response);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Course Details'),
      ),
      body: FutureBuilder<Course>(
        future: fetchCourseDetails(courseId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final course = snapshot.data!;
            return SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(course.name,
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.bold)),
                    SizedBox(height: 8),
                    Text('State: ${course.state}',
                        style: TextStyle(fontSize: 16)),
                    SizedBox(height: 8),
                    Text('Cost: ${course.cost}',
                        style: TextStyle(fontSize: 16)),
                    SizedBox(height: 16),
                    Text('Chapters:',
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.bold)),
                    ...course.chapters
                        .map((chapter) => ChapterWidget(chapter: chapter))
                        .toList(),
                  ],
                ),
              ),
            );
          } else {
            return Center(child: Text('No data available'));
          }
        },
      ),
    );
  }
}

class ChapterWidget extends StatelessWidget {
  final Chapter chapter;

  ChapterWidget({required this.chapter});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 16),
        Text('Chapter: ${chapter.title ?? 'No Title'}',
            style: TextStyle(fontSize: 18)),
        ...chapter.lessons.map((lesson) => LessonWidget(lesson: lesson)),
      ],
    );
  }
}

class LessonWidget extends StatelessWidget {
  final Lesson lesson;

  LessonWidget({required this.lesson});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(lesson.title),
      subtitle: Text(lesson.link),
      trailing: IconButton(
        icon: Icon(Icons.play_circle_fill, color: Colors.blue),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) =>
                  YouTubePlayerScreen(youtubeUrl: lesson.link),
            ),
          );
        },
      ),
    );
  }
}
