import 'package:flutter/material.dart';
import 'package:readmore/readmore.dart';

class CourseDetail extends StatefulWidget {
  const CourseDetail({super.key});

  @override
  State<CourseDetail> createState() => _CourseDetailState();
}

class _CourseDetailState extends State<CourseDetail> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Icon(Icons.arrow_back, color: Colors.blue, size: 30),
                  ),
                  Row(children: [
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Icon(
                        Icons.share,
                        color: Colors.blue,
                        size: 30,
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Icon(Icons.shopping_cart,
                          color: Colors.blue, size: 30),
                    ),
                  ]),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.all(Radius.circular(10)),
                    child: Image.asset(
                      'assets/images/php.jpg',
                      width: double.infinity,
                      height: 250,
                      fit: BoxFit.cover,
                    ),
                  ),
                  const Column(
                    children: [
                      Icon(
                        Icons.play_arrow,
                        size: 100,
                        color: Colors.white,
                      )
                    ],
                  )
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Container(
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(30),
                      topRight: Radius.circular(30),
                    )),
                child: const Padding(
                  padding: EdgeInsets.only(left: 20, right: 20, top: 20),
                  child: Column(
                    children: [
                      Text(
                        "Khóa học BOOTCAMP PHP",
                        style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.bold,
                            color: Colors.black),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Icon(
                                Icons.person,
                                color: Colors.blue,
                              ),
                              SizedBox(
                                width: 10,
                              ),
                              Text(
                                "Trần Bão",
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.blue,
                                ),
                              )
                            ],
                          )
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        // Align items vertically
                        children: [
                          // First item
                          Row(
                            children: [
                              Icon(
                                Icons.play_circle_outline,
                                size: 30,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                "30 Lessons",
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
                          // Second item
                          const SizedBox(
                            width: 20,
                          ),
                          Row(
                            children: [
                              Icon(
                                Icons.access_time,
                                size: 30,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                "12h",
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            width: 20,
                          ),
                          Row(
                            children: [
                              Icon(
                                Icons.star,
                                size: 30,
                                color: Colors.yellow,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                "5.0",
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      ReadMoreText(
                          "Sử dụng thành thạo ngôn ngữ JavaScript và PHP. "
                          "Làm chủ được các kỹ thuật lập trình Hướng đối tượng bằng JavaScript và PHP."
                          " Sử dụng các cấu trúc dữ liệu phù hợp trong các tình huống thông dụngTuân thủ tốt các nguyên tắc mã sạch thông dụng. "
                          "Xây dựng được các website tĩnh có độ phức tạp thấp. Tạo được các ứng dụng web sử dụng nền tảng Laravel."
                          "Tạo lập và truy vấn đuợc cơ sở dữ liệu quan hệ MySQL.Tạo đuợc ứng dụng frontend sử dụng nền tảng Angular."
                          "Sử dụng đuợc các công cụ lập trình phần mềm hiện đại.Tham gia tốt vào nhóm phát triển phần mềm Agile. "
                          "Viết đuợc Unit Test cho ứng dụng PHP. Nắm chắc kiến thức luyện thi Chứng chỉ Lập trình Quốc tế (OCA)"),
                    ],
                  ),
                )),
          ],
        ),
      ),
    );
  }
}
