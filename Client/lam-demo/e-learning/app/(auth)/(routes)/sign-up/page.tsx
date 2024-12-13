"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  // URL API bạn cung cấp cho đăng ký
  const apiUrl =
    "https://96de-2405-4802-b545-af0-fdbc-df39-8ad1-fb93.ngrok-free.app/auth/signup";

  // Hàm xử lý đăng ký
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Bật trạng thái loading khi gửi yêu cầu

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await axios.post(
        apiUrl, // API URL đăng ký
        {
          email,
          password,
        }
      );

      // Kiểm tra phản hồi từ API và thông báo thành công
      if (response.data && response.data.success) {
        setSuccessMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setTimeout(() => router.push("/sign-in"), 2000); // Chuyển hướng đến trang đăng nhập sau 2 giây
      } else {
        setError("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } catch (err) {
      // Xử lý lỗi trong quá trình gửi yêu cầu
      console.error(err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Đăng ký E-learning
          </h1>
          <p className="text-xl text-white font-normal">
            Chào mừng bạn, hãy tạo tài khoản để bắt đầu học ngay!
          </p>
        </div>
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">E-learning</h1>

        <form
          className="w-full flex flex-col max-w-[500px]"
          onSubmit={handleSignUp}
        >
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Đăng ký tài khoản</h3>
            <p className="text-base mb-2">
              Chào mừng bạn, hãy điền thông tin dưới đây để tạo tài khoản
            </p>
          </div>

          {/* Các trường nhập liệu */}
          <input
            type="email"
            placeholder="Email"
            className="w-full text-black py-4 border-b bg-transparent border-black outline-none focus:outline-none mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full text-black py-4 border-b bg-transparent border-black outline-none focus:outline-none mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Hiển thị thông báo lỗi nếu có */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Hiển thị thông báo thành công nếu đăng ký thành công */}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}

          <button
            type="submit"
            className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>

          <div className="w-full text-[#060606] my-2 bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
            {/* <img src="https://example.com/google_icon.png" className="h-6 mr-2 object-contain" alt="Google icon" /> */}
            Đăng ký với Google
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Đã có tài khoản?{" "}
              <span
                className="font-semibold underline cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Đăng nhập tại đây
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
