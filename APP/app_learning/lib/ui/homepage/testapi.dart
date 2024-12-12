import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../Course/Lesson.dart';
import '../Course/VideoPlayerWidget.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Course Details',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CoursePage(),
    );
  }
}

class CoursePage extends StatefulWidget {
  @override
  _CoursePageState createState() => _CoursePageState();
}

class _CoursePageState extends State<CoursePage> {
  late Future<Course> course;

  @override
  void initState() {
    super.initState();
    course = fetchCourse();
  }

  Future<Course> fetchCourse() async {
    final response = await http.get(Uri.parse(
        'https://963b-2405-4802-9644-6b80-3d94-58b9-8f68-f17f.ngrok-free.app/course/2'));

    if (response.statusCode == 200) {
      return Course.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load course');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Course Details'),
      ),
      body: FutureBuilder<Course>(
        future: course,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('No data available.'));
          } else {
            final course = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.network(course.pictureLink),
                  SizedBox(height: 16),
                  Text(course.name,
                      style:
                          TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text(course.shortCut),
                  SizedBox(height: 16),
                  Text('Chapters:'),
                  ListView.builder(
                    shrinkWrap: true,
                    itemCount: course.chapters.length,
                    itemBuilder: (context, index) {
                      final chapter = course.chapters[index];
                      return ListTile(
                        title: Text('Chapter ${chapter.chapterID}'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: chapter.lessons.map((lesson) {
                            return Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(lesson.title),
                                SizedBox(height: 4),
                                Text(lesson.description),
                                SizedBox(height: 4),
                                lesson.link.isNotEmpty
                                    ? VideoPlayerWidget(videoUrl: lesson.link)
                                    : Container(),
                                SizedBox(height: 8),
                              ],
                            );
                          }).toList(),
                        ),
                      );
                    },
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
