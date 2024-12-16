class Course {
  final int id;
  final String? name;
  final String? avatar;
  final int cost;
  final int courseId;
  final int userId;

  final String? shortcut;
  final String? description;
  final String createAt;
  final String? parentId;
  final String state;
  final String? categoryId;

  final List<Chapter> chapters;

  Course({
    required this.id,
    this.name,
    this.avatar,
    required this.cost,
    required this.courseId,
    required this.userId,
    this.shortcut,
    this.description,
    required this.createAt,
    this.parentId,
    required this.state,
    this.categoryId,
    required this.chapters,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'] != null ? json['id'] as int : 0,
      // Đảm bảo id được gán đúng
      name: json['name'] ?? 'Unknown',
      // Nếu name null thì gán giá trị mặc định là 'Unknown'
      avatar: json['avatar'] ?? '',
      // Nếu avatar null thì gán giá trị mặc định là rỗng
      cost: json['cost'] != null ? json['cost'] as int : 0,
      courseId: json['courseID'] ?? 0,
      userId: json['userId'] ?? 0,
      shortcut: json['shortCut'] ?? '',
      description: json['description'] ?? '',
      createAt: json['createAt'] ?? '',
      parentId: json['parentId'] ?? '',
      state: json['state'] ?? '',
      categoryId: json['categoryId'] ?? '',
      chapters: (json['chapters'] as List<dynamic>?)
              ?.map((chapter) => Chapter.fromJson(chapter))
              .toList() ??
          [], // Default to empty list if chapters is null
    );
  }

  get rating => 5.0;
}

class Chapter {
  final int chapterId;
  final int courseId;
  final String? title;
  final String? description;
  final List<Lesson> lessons;

  Chapter({
    required this.chapterId,
    required this.courseId,
    this.title,
    this.description,
    required this.lessons,
  });

  factory Chapter.fromJson(Map<String, dynamic> json) {
    return Chapter(
      chapterId: json['ChapterID'],
      courseId: json['CourseID'],
      title: json['Title'],
      description: json['Description'],
      lessons: (json['lessons'] as List)
          .map((lesson) => Lesson.fromJson(lesson))
          .toList(),
    );
  }
}

class Lesson {
  final int lessonId;
  final int chapterId;
  final String fileLink;
  final String title;
  final int duration;
  final String? description;
  final int isAllowDemo;
  final String type;
  final String link;

  Lesson({
    required this.lessonId,
    required this.chapterId,
    required this.fileLink,
    required this.title,
    required this.duration,
    this.description,
    required this.isAllowDemo,
    required this.type,
    required this.link,
  });

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      lessonId: json['LessonID'],
      chapterId: json['ChapterID'],
      fileLink: json['FileLink'],
      title: json['Title'],
      duration: json['Duration'],
      description: json['Description'],
      isAllowDemo: json['IsAllowDemo'],
      type: json['Type'],
      link: json['Link'],
    );
  }
}
