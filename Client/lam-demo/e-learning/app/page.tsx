import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Giả định có danh sách khóa học
const courses = [
  {
    id: 1,
    title: "Learn Web Development",
    description: "Build responsive websites using HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "JavaScript for Beginners",
    description: "Get started with JavaScript, the language of the web.",
  },
  {
    id: 3,
    title: "React - The Complete Guide",
    description: "Master React and build interactive UIs with ease.",
  },
  // Bạn có thể thêm nhiều khóa học khác
];

export default function HomePage() {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Our Courses</h1>
    </Container>
    // <div className="container my-5">
    //   <h1 className="text-center mb-4">Our Courses</h1>
    //   <div className="row">
    //     {courses.map((course) => (
    //       <div key={course.id} className="col-md-4 mb-4">
    //         <div className="card h-100 shadow-sm">
    //           <div className="card-body">
    //             <h5 className="card-title">{course.title}</h5>
    //             <p className="card-text">{course.description}</p>
    //             <a href={`/courses/${course.id}`} className="btn btn-primary">
    //               View Details
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
