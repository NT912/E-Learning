"use client"
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getToken, messaging } from '../../config/firsebase'; // Import hàm lấy FCM token

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const requestPermissionAndFetchToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const token = await getToken(messaging, { vapidKey: "BG9ZLCqtf384oRUHMmEKYWiZdF02JmZVCKb4TUdOvhqh0N8sOF0h1ht9zwODQj4U846asDq-Y-y5PbinqJ4JocY" });
          setFcmToken(token);
          console.log("FCM Token:", token);
        } else {
          console.warn("Quyền thông báo bị từ chối.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy FCM token:", error);
      }
    };

    requestPermissionAndFetchToken();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, fcmToken }),
        });
    
        if (response.ok) {
          const data = await response.json();
          setError(null);
          
          localStorage.setItem("token", data.token);
    
          console.log("oke");
          router.push("/create-course");
        } else {
          const errorData = await response.json();
          console.log(errorData)
          setError(errorData.message || "Email hoặc mật khẩu không chính xác");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gọi API:", error);
        setError("Something go wrong");
      }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100" style={{ maxWidth: '400px' }}>
        <Col>
          <h3 className="text-center mb-4">Đăng Nhập</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Đăng Nhập
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
