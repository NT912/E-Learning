import 'package:flutter/material.dart';

import 'ChatDetailScreen.dart';

class ChatListScreen extends StatelessWidget {
  final List<Map<String, String>> chats = [
    {"name": "Minh", "message": "Chào buổi tối nhé!", "time": "14:59"},
    {"name": "Hà", "message": "Tôi vừa hoàn thành rồi!", "time": "06:35"},
    {"name": "Nam", "message": "Bạn thế nào rồi?", "time": "08:10"},
    {"name": "Linh", "message": "Thật sự rất ấn tượng!", "time": "09:15"},
    {"name": "Hương", "message": "Chào buổi tối nhé!", "time": "14:59"},
    {"name": "Phương", "message": "Tôi vừa hoàn thành rồi!", "time": "06:35"},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tin nhắn'),
        backgroundColor: Colors.blue,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: chats.length,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Colors.black,
                    child: Icon(Icons.person, color: Colors.white),
                  ),
                  title: Text(chats[index]["name"]!),
                  subtitle: Text(chats[index]["message"]!),
                  trailing: Text(chats[index]["time"]!),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => ChatDetailScreen(
                          name: chats[index]["name"]!,
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.chat), label: "My Courses"),
          BottomNavigationBarItem(icon: Icon(Icons.message), label: "Inbox"),
          BottomNavigationBarItem(
              icon: Icon(Icons.money), label: "Transaction"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Profile"),
        ],
      ),
    );
  }
}
