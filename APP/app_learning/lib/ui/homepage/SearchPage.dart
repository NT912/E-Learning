import 'package:flutter/material.dart';
import 'search_result_page.dart'; // Import trang kết quả tìm kiếm

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController _searchController = TextEditingController();
  List<String> recentSearches = [
    "3D Design",
    "Graphic Design",
    "Programming",
    "SEO & Marketing",
    "Web Development",
  ];

  void _search(String query) {
    if (query.isNotEmpty) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => SearchResultPage(query: query),
        ),
      );

      // Thêm từ khóa vào danh sách gần đây
      setState(() {
        if (!recentSearches.contains(query)) {
          recentSearches.insert(0, query);
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Search"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
            Container(
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8.0),
                    child: Icon(Icons.search, color: Colors.grey),
                  ),
                  Expanded(
                    child: TextField(
                      controller: _searchController,
                      decoration: const InputDecoration(
                        hintText: "Search...",
                        border: InputBorder.none,
                      ),
                      onSubmitted: _search, // Tìm kiếm khi nhấn Enter
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send, color: Colors.blue),
                    onPressed: () {
                      _search(_searchController.text); // Tìm kiếm khi nhấn nút
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            // Recents Search
            const Text(
              "Recents Search",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: recentSearches.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(recentSearches[index]),
                    trailing: IconButton(
                      icon: const Icon(Icons.close, color: Colors.grey),
                      onPressed: () {
                        setState(() {
                          recentSearches.removeAt(index); // Xóa từ khóa
                        });
                      },
                    ),
                    onTap: () {
                      _search(recentSearches[index]); // Tìm kiếm từ khóa
                    },
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
