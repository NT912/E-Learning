const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sqlRequest } = require("~/config/db");

const authService = {
  signup: async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const request = await sqlRequest();
      await request
        .input("Email", userData.email)
        .input("HashPassword", hashedPassword)
        .input("Role", userData.role)
        .input("CreateAt", new Date())
        .query(`
          INSERT INTO Users (Email, HashPassword, Role, CreateAt)
          VALUES (@Email, @HashPassword, @Role, @CreateAt)
        `);
      return { message: "User created successfully!" };
    } catch (err) {
      throw new Error("Error creating user: " + err.message);
    }
  },

  login: async (userData) => {
    try {
      const request = await sqlRequest();
      const result = await request
        .input("Email", userData.email)
        .query(`SELECT * FROM Users WHERE Email = @Email`);

      const user = result.recordset[0];
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { id
