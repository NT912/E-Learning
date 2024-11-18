import 'package:app_learning/ui/Course/ListProCourse.dart';
import 'package:flutter/material.dart';

class Coursecard extends StatelessWidget {
  const Coursecard({super.key, required this.course});

  final Course course;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 200,
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 5,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          children: [Image.asset('assets/images/login.png')],
        ),
      ),
    );
  }
}
