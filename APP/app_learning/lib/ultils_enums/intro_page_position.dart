enum IntroPagePosition {
  page1,
  page2,
}

extension IntroPagePositionExtension on IntroPagePosition {
  // trả về tiêu đề cho từng page intro
  String introPageTitle() {
    if (this == IntroPagePosition.page1) {
      return "Học trực tuyến";
    } else if (this == IntroPagePosition.page2) {
      return "Nhận chứng chỉ trực tuyến";
    }
    return ""; // Default case, in case other values are passed
  }

  // trả về nội dung cho từng page intro
  String introPageContent() {
    if (this == IntroPagePosition.page1) {
      return "Chúng tôi cung cấp các lớp học trực tuyến và các bài giảng được ghi âm trước!";
    } else if (this == IntroPagePosition.page2) {
      return "Phân tích điểm số của bạn và theo dõi kết quả của bạn";
    }
    return ""; // Default case
  }
}
