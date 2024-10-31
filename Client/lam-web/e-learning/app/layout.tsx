export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaPH0lsINA2af3wBaq4UfzF1g86S96knuDw0e38aI5F2bU5Hf/k5j5P7vAO"
          crossOrigin="anonymous"
        />
        <title>E-Learning Platform</title>
      </head>
      <body>
        <div className="min-vh-100 d-flex flex-column">
          {/* Navbar */}
          <header className="bg-primary text-white p-3 shadow-sm d-flex">
            <div className="container d-flex justify-content-between align-items-center">
              <h1 className="fs-4 fw-bold mb-0">E-Learning Platform</h1>
              <nav className="d-flex gap-3">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
                <a href="/courses" className="text-white text-decoration-none">
                  Courses
                </a>
                <a href="/about" className="text-white text-decoration-none">
                  About
                </a>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </nav>
            </div>
          </header>

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
