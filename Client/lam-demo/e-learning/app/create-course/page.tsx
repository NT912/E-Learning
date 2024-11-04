"use client"

import React, {useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function CreateCoursePage() {
  const [showChapterForm, setShowChapterForm] = useState(false);
  const handleAddChapter = () => {
    setShowChapterForm(true);
  };
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Create a New Course</h1>
      <Row className="justify-content-center">
        <Col md={8}> 
          <Form className="w-50">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course title"
                required
              />

              <Form.Label>Course Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter course description" required />
              
              <Button variant="primary" onClick={handleAddChapter }>
                Add Chapter
              </Button>

              <Button variant="success" type="submit">
                  Confirm
              </Button>
          </Form>

          {showChapterForm && (
            <Form className="mt-4">
              <h4>Add a Chapter</h4>
              <Form.Group controlId="chapterTitle" className="mb-3">
                <Form.Label>Chapter Title</Form.Label>
                <Form.Control type="text" placeholder="Enter chapter title" required />
              </Form.Group>

              <Form.Group controlId="chapterDescription" className="mb-3">
                <Form.Label>Chapter Description</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder="Enter chapter description" required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Confirm Chapter
              </Button>
            </Form>
          )}
          
        </Col> 
      </Row>
    </Container>
  );
}
