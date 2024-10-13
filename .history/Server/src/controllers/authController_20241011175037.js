import { authService } from "~/services/authService";

export const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(400).json({ message: error.message });
  }
};
