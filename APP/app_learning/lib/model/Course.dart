class Course {
  final String? name;
  final String? avatar;
  final int cost;

  Course({this.name, this.avatar, required this.cost});

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      name: json['name'] as String?,
      avatar: json['avatar'] as String?,
      cost: json['cost'] as int,
    );
  }

  get rating => 5.0;
}
