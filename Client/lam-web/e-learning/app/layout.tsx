import React, { ReactNode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from "react-bootstrap";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/" className="fs-4 fw-bold">E-Learning Platform</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="/courses" className="text-white">Courses</Nav.Link>
              <Nav.Link href="/about" className="text-white">About</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container as="main" className="flex-grow-1 py-4">
          {children}
        </Container>

        {/* Footer */}
        <footer className="bg-dark text-white py-3 text-center mt-auto">
          <Container>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.
            </p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
