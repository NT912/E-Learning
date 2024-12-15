import 'package:flutter/material.dart';
import 'package:readmore/readmore.dart';

class SingleCourseDetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image Section
          Image.asset(
            'assets/images/php.jpg',
            width: double.infinity,
            height: 250,
            fit: BoxFit.cover,
          ),
          SizedBox(height: 16),

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
                    const Text(
                      "PHP",
                      style: TextStyle(
                        color: Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      "Khóa học BOOTCAMP PHP",
                      style: TextStyle(
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
                    )
                  ],
                ),
              ),
            ),
          ),
          // Tab Bar Section
          DefaultTabController(
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
                Container(
                  height: 300, // Placeholder height for TabBarView
                  child: TabBarView(
                    children: [
                      const ReadMoreText(
                          "Sử dụng thành thạo ngôn ngữ JavaScript và PHP. "
                          "Làm chủ được các kỹ thuật lập trình Hướng đối tượng bằng JavaScript và PHP."
                          " Sử dụng các cấu trúc dữ liệu phù hợp trong các tình huống thông dụngTuân thủ tốt các nguyên tắc mã sạch thông dụng. "
                          "Xây dựng được các website tĩnh có độ phức tạp thấp. Tạo được các ứng dụng web sử dụng nền tảng Laravel."
                          "Tạo lập và truy vấn đuợc cơ sở dữ liệu quan hệ MySQL.Tạo đuợc ứng dụng frontend sử dụng nền tảng Angular."
                          "Sử dụng đuợc các công cụ lập trình phần mềm hiện đại.Tham gia tốt vào nhóm phát triển phần mềm Agile. "
                          "Viết đuợc Unit Test cho ứng dụng PHP. Nắm chắc kiến thức luyện thi Chứng chỉ Lập trình Quốc tế (OCA)",
                          style: TextStyle(fontSize: 16)),
                      ListView(
                        padding: const EdgeInsets.all(16.0),
                        children: [
                          CurriculumItem(
                            section: "Section 01",
                            title: "Introduction",
                            duration: "25 Mins",
                            lessons: const [
                              {"title": "Tại sao dùng PHP", "time": "15 Mins"},
                              {"title": "Cài đặt PHP", "time": "10 Mins"},
                            ],
                          ),
                          CurriculumItem(
                            section: "Section 02",
                            title: "Advanced Topics",
                            duration: "30 Mins",
                            lessons: const [
                              {
                                "title": "Lập trình hướng đối tượng",
                                "time": "20 Mins"
                              },
                              {"title": "Xây dựng API", "time": "10 Mins"},
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
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
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Mua ngay- 500.000 VNĐ",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class CurriculumItem extends StatelessWidget {
  final String section;
  final String title;
  final String duration;
  final List<Map<String, String>> lessons;

  CurriculumItem({
    required this.section,
    required this.title,
    required this.duration,
    required this.lessons,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "$section - $title",
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        SizedBox(height: 4),
        Text(duration),
        SizedBox(height: 16),
        ...lessons.map((lesson) {
          return ListTile(
            contentPadding: EdgeInsets.zero,
            leading: const CircleAvatar(
              radius: 16,
              backgroundColor: Colors.blue,
              child: Icon(Icons.play_arrow, color: Colors.white, size: 16),
            ),
            title: Text(lesson['title']!),
            trailing: Text(lesson['time']!),
          );
        }).toList(),
      ],
    );
  }
}
