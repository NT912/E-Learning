"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        { email, password }
      );

      if (response.data) {
        console.log()
        localStorage.setItem("token", response.data.data.description.token);
        router.push("/");
      } else {
        setError("Đăng nhập không thành công. Vui lòng thử lại.");
      }
    } catch {
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="relative flex w-1/2 flex-col h-full">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="my-4 text-4xl font-bold text-white">Học với E-learning</h1>
          <p className="text-xl font-normal text-white">
            Nhiều khóa học hấp dẫn đang chào đón bạn
          </p>
        </div>
        <img
          src="https://images.alphacoders.com/605/605592.jpg"
          className="h-full w-full object-cover"
          alt="E-learning Background"
        />
      </div>

      <div className="flex flex-col justify-between w-1/2 h-full bg-[#f5f5f5] p-20">
        <h1 className="text-xl font-semibold text-[#060606]">E-learning</h1>

        <form className="flex flex-col max-w-[500px]" onSubmit={handleLogin}>
          <div className="mb-2 flex flex-col w-full">
            <h3 className="mb-2 text-3xl font-semibold">Đăng nhập</h3>
            <p className="text-base">Chào mừng bạn, hãy điền thông tin dưới đây</p>
          </div>

          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Email"
              className="mb-4 w-full py-4 border-b border-black bg-transparent text-black outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 w-full py-4 border-b border-black bg-transparent text-black outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="flex items-center justify-center w-full my-2 p-4 text-white bg-[#060606] rounded-md"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <div className="relative flex items-center justify-center py-2 w-full">
            <div className="h-[1px] w-full bg-black/40"></div>
            <p className="absolute bg-[#f5f5f5] text-lg text-black/80">or</p>
          </div>

          <div className="flex items-center justify-center w-full my-2 p-4 bg-white border border-black/40 rounded-md text-[#060606] cursor-pointer">
            <img
              src="https://example.com/google_icon.png"
              alt="Google icon"
              className="mr-2 h-6 object-contain"
            />
            Đăng nhập với Google
          </div>

          <div className="flex items-center justify-center w-full">
            <p className="text-sm font-normal text-[#060606]">
              Không có tài khoản sao?{" "}
              <span className="font-semibold underline cursor-pointer">
                Đăng kí tại đây
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
