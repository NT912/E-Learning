import 'package:flutter/material.dart';

class Category extends StatelessWidget {
  final List<Map<String, String>> categories = [
    {'icon': 'assets/images/3d_design.png', 'title': '3D Design'},
    {'icon': 'assets/images/graphic_design.png', 'title': 'Graphic Design'},
    {'icon': 'assets/images/web_development.png', 'title': 'Web Development'},
    {'icon': 'assets/images/seo_marketing.png', 'title': 'SEO & Marketing'},
    {'icon': 'assets/images/finance.png', 'title': 'Finance & Accounting'},
    {'icon': 'assets/images/personal.png', 'title': 'Personal Development'},
  ];

  Category({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tất cả khóa học'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(8.0),
              ),
              child: const TextField(
                decoration: InputDecoration(
                  hintText: 'Tìm kiếm...',
                  border: InputBorder.none,
                  prefixIcon: Icon(Icons.search),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 16.0,
                  crossAxisSpacing: 16.0,
                  childAspectRatio: 1.0,
                ),
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  return CategoryItem(
                    iconPath: categories[index]['icon']!,
                    title: categories[index]['title']!,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CategoryItem extends StatelessWidget {
  final String iconPath;
  final String title;

  const CategoryItem({
    super.key,
    required this.iconPath,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Image.asset(
          iconPath,
          height: 50,
          width: 50,
          fit: BoxFit.cover,
        ),
        const SizedBox(height: 8),
        Text(
          title,
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}
