// (dashboard)/routes/page.tsx
"use client"; // Thêm dòng này ở đầu file

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   // Kiểm tra xem token có tồn tại trong localStorage hay không
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     // Nếu không có token, chuyển hướng đến trang đăng nhập
  //     router.push("/sign-in");
  //   }
  // }, [router]);

  return (
    <div className="container">
      {/* Pro Courses Section */}
      <section className="pro-courses">
        <h2>Khóa học Pro</h2>
        <div className="course-list">
          <div className="course-card">
            <h3>HTML, CSS Pro</h3>
            <p>Cho người mới bắt đầu</p>
            <div className="price">
              <span className="old-price">2.500.000đ</span>
              <span className="new-price">1.299.000đ</span>
            </div>
            <p>
              <strong>590</strong> học viên · <strong>116h44p</strong>
            </p>
          </div>
          <div className="course-card">
            <h3>Ngôn ngữ Sass</h3>
            <p>Cho Frontend Developer</p>
            <div className="price">
              <span className="old-price">400.000đ</span>
              <span className="new-price">299.000đ</span>
            </div>
            <p>
              <strong>27</strong> học viên · <strong>6h18p</strong>
            </p>
          </div>
          <div className="course-card">
            <h3>JavaScript Pro</h3>
            <p>Cho người mới bắt đầu</p>
            <div className="price">
              <span className="old-price">3.299.000đ</span>
              <span className="new-price">1.399.000đ</span>
            </div>
            <p>
              <strong>139</strong> học viên · <strong>24h0p</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section className="free-courses">
        <h2>Khóa học miễn phí</h2>
        <div className="course-list">
          <div className="course-card">
            <h3>Kiến Thức Nhập Môn IT</h3>
            <p>Miễn phí</p>
            <p>
              <strong>131.562</strong> học viên · <strong>3h12p</strong>
            </p>
          </div>
          <div className="course-card">
            <h3>Lập trình C++ cơ bản, nâng cao</h3>
            <p>Miễn phí</p>
            <p>
              <strong>31.247</strong> học viên · <strong>10h18p</strong>
            </p>
          </div>
          <div className="course-card">
            <h3>HTML CSS từ Zero đến Hero</h3>
            <p>Miễn phí</p>
            <p>
              <strong>203.364</strong> học viên · <strong>29h5p</strong>
            </p>
          </div>
          <div className="course-card">
            <h3>Responsive Với Grid System</h3>
            <p>Miễn phí</p>
            <p>
              <strong>45.685</strong> học viên · <strong>6h31p</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Inline Styles */}
      <style jsx>{`
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          font-size: 24px;
          margin: 20px 0;
          color: #333;
        }

        .course-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .course-card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          flex: 1 1 calc(33% - 20px);
          max-width: calc(33% - 20px);
          box-sizing: border-box;
          text-align: center;
        }

        .course-card h3 {
          font-size: 18px;
          color: #444;
          margin-bottom: 10px;
        }

        .course-card p {
          font-size: 14px;
          color: #777;
          margin: 5px 0;
        }

        .price {
          margin: 10px 0;
        }

        .old-price {
          text-decoration: line-through;
          color: #aaa;
          margin-right: 10px;
        }

        .new-price {
          font-weight: bold;
          color: #e74c3c;
        }

        strong {
          color: #333;
        }
      `}</style>
    </div>
  );
}
