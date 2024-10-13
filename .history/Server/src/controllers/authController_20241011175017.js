import { authService } from "~/services/authService";

export const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).send(result); // Trả về mã trạng thái 201 nếu thành công
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(400).json({ message: error.message }); // Trả về mã 400 và thông tin lỗi nếu có vấn đề
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token }); // Trả về mã 200 nếu thành công
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ message: error.message }); // Trả về mã 400 và thông tin lỗi nếu có vấn đề
  }
};
