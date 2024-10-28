import 'package:app_learning/ui/homepage/HomePage.dart';
import 'package:flutter/material.dart';

class Mainpage extends StatefulWidget {
  const Mainpage({super.key});

  @override
  State<Mainpage> createState() => _MainPageState();
}

class _MainPageState extends State<Mainpage> {
  List<Widget> pages = [];
  int currentPage = 0;

  @override
  void initState() {
    super.initState();
    pages = [
      HomePage(),
      // const FreeCourse(),
      Container(color: Colors.green),
      Container(color: Colors.black),
      Container(color: Colors.yellow),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages.elementAt(currentPage),
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.black,
        currentIndex: currentPage,
        type: BottomNavigationBarType.fixed,
        onTap: (index) {
          setState(() {
            currentPage = index;
          });
        },
        items: [
          BottomNavigationBarItem(
              icon: Image.asset(
                "assets/images/home.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
              ),
              activeIcon: Image.asset(
                "assets/images/home.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
                color: Colors.green,
              ),
              label: "Home",
              backgroundColor: const Color(0xFFF5F9FF)),
          BottomNavigationBarItem(
              icon: Image.asset(
                "assets/images/course.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
              ),
              activeIcon: Image.asset(
                "assets/images/course.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
                color: Colors.green,
              ),
              label: "Course",
              backgroundColor: const Color(0xFFF5F9FF)),
          BottomNavigationBarItem(
              icon: Image.asset(
                "assets/images/inbox.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
              ),
              activeIcon: Image.asset(
                "assets/images/inbox.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
                color: Colors.green,
              ),
              label: "Inbox",
              backgroundColor: const Color(0xFFF5F9FF)),
          BottomNavigationBarItem(
              icon: Image.asset(
                "assets/images/profile.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
              ),
              activeIcon: Image.asset(
                "assets/images/profile.png",
                width: 30,
                height: 30,
                fit: BoxFit.fill,
                color: Colors.green,
              ),
              label: "Profile",
              backgroundColor: const Color(0xFFF5F9FF)),
        ],
      ),
    );
  }
}
