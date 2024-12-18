const Login = () => {
  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Học với E-learning
          </h1>
          <p className="text-x1 text-white font-normal">
            Nhiều khóa học hấp dẫn đang chào đón bạn
          </p>
        </div>

        {/* <img
          src="https://images.alphacoders.com/605/605592.jpg"
          className="w-full h-full object-cover"
        /> */}
      </div>

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between">
        <h1 className="text-xl text-[#060606] font-semibold">E-learning</h1>

        <form className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Đăng nhập</h3>
            <p className="text-base mb-2">
              Chào mừng bạn, hãy điền thông tin dưới đây
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-4 border-b bg-transparent border-black outline-none focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-4 border-b bg-transparent border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex items-center justify-between my-4">
            <div className="flex items-center">
              <input id="rememberMe" type="checkbox" className="w-4 h-4 mr-2" />
              <label htmlFor="rememberMe" className="text-sm">
                Lưu mật khẩu
              </label>
            </div>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline">
              Quên mật khẩu?
            </p>
          </div>

          <button className="w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
            Đăng nhập
          </button>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
          </div>

          <div className="w-full text-[#060606] my-2 bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
            {/* <img
              src="https://example.com/google_icon.png"
              className="h-6 mr-2 object-contain"
              alt="Google icon"
            /> */}
            Đăng nhập với Google
          </div>

          <div className="w-full flex item-center justify-center">
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
