import 'package:flutter/material.dart';

class CourseSearch extends StatefulWidget {
  final Function(String) onSearch; // Callback khi nhấn Enter hoặc nút tìm kiếm

  const CourseSearch({super.key, required this.onSearch});

  @override
  State<CourseSearch> createState() => _CourseSearchState();
}

class _CourseSearchState extends State<CourseSearch> {
  final TextEditingController _controller = TextEditingController();

  void _handleSearch() {
    final query = _controller.text.trim(); // Loại bỏ khoảng trắng thừa
    if (query.isNotEmpty) {
      widget.onSearch(query); // Gọi callback với từ khóa tìm kiếm
    }
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      onSubmitted: (value) => _handleSearch(), // Xử lý khi nhấn Enter
      decoration: InputDecoration(
        hintText: 'Nhập từ khóa tìm kiếm...',
        prefixIcon: GestureDetector(
          onTap: _handleSearch, // Xử lý khi nhấn vào icon
          child: const Icon(Icons.search),
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }
}
