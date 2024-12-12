class ListCategory {
  final int categoryId;
  final String name;

  ListCategory({required this.categoryId, required this.name});

  // Phương thức tạo đối tượng Category từ JSON
  factory ListCategory.fromJson(Map<String, dynamic> json) {
    return ListCategory(
      categoryId: json['CategoryID'], // Lấy 'CategoryID' từ JSON
      name: json['Name'], // Lấy 'Name' từ JSON
    );
  }
}
