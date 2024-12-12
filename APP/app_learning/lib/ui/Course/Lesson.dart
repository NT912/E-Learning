class Lesson {
  final int lessonID;
  final String title;
  final String description;
  final String link;

  Lesson(
      {required this.lessonID,
      required this.title,
      required this.description,
      required this.link});

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      lessonID: json['LessonID'],
      title: json['Title'],
      description: json['Description'] ?? '',
      link: json['Link'] ?? '',
    );
  }
}

class Chapter {
  final int chapterID;
  final List<Lesson> lessons;

  Chapter({required this.chapterID, required this.lessons});

  factory Chapter.fromJson(Map<String, dynamic> json) {
    var lessonsFromJson = json['lessons'] as List;
    List<Lesson> lessonList =
        lessonsFromJson.map((lesson) => Lesson.fromJson(lesson)).toList();

    return Chapter(
      chapterID: json['ChapterID'],
      lessons: lessonList,
    );
  }
}

class Course {
  final int courseID;
  final String name;
  final String pictureLink;
  final String shortCut;
  final List<Chapter> chapters;

  Course({
    required this.courseID,
    required this.name,
    required this.pictureLink,
    required this.shortCut,
    required this.chapters,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    var chaptersFromJson = json['chapters'] as List;
    List<Chapter> chapterList =
        chaptersFromJson.map((chapter) => Chapter.fromJson(chapter)).toList();

    return Course(
      courseID: json['CourseID'],
      name: json['Name'],
      pictureLink: json['PictureLink'],
      shortCut: json['ShortCut'],
      chapters: chapterList,
    );
  }
}
