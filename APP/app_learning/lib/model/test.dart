class Course {
  final int courseId;
  final int userId;
  final String name;
  final String avatar;
  final String? shortcut;
  final String? description;
  final String createAt;
  final String? parentId;
  final String state;
  final String? categoryId;
  final int cost;
  final List<Chapter> chapters;

  Course({
    required this.courseId,
    required this.userId,
    required this.name,
    required this.avatar,
    this.shortcut,
    this.description,
    required this.createAt,
    this.parentId,
    required this.state,
    this.categoryId,
    required this.cost,
    required this.chapters,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      courseId: json['CourseID'],
      userId: json['UserID'],
      name: json['Name'],
      avatar: json['avatar'],
      shortcut: json['ShortCut'],
      description: json['Description'],
      createAt: json['CreateAt'],
      parentId: json['ParentID'],
      state: json['State'],
      categoryId: json['CategoryID'],
      cost: json['Cost'],
      chapters: (json['chapters'] as List)
          .map((chapter) => Chapter.fromJson(chapter))
          .toList(),
    );
  }
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
