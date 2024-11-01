import { Nav, Navbar, NavbarBrand, NavLink, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-vh-100 d-flex flex-column">
          {/* Navbar */}
          <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
            <NavbarBrand href="#" className="ms-3">
            <Image
              src="/img/logo.png" // cai cho ni bo lo go do
              width="50" // chinh kich thuoc
              height="50"
            />
            </NavbarBrand>
            <Nav className="ms-auto me-10"> 
              <NavLink href="/">home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/Course">Course</NavLink>
              <NavLink href="/Contact">Contact</NavLink>
            </Nav>
          </Navbar>

          {/* Main Content */}
          <main className="flex-grow-1 container py-4">{children}</main>

          {/* Footer */}
          <footer className="bg-dark text-white py-3 text-center mt-auto">
            <div className="container">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} E-Learning Platform. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
