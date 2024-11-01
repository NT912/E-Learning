const bcrypt = require("bcryptjs");

const generateAdminPassword = async () => {
  const password = "123456"; // Mật khẩu bạn muốn mã hóa
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Mã hóa mật khẩu: ", hashedPassword);
};

generateAdminPassword();
