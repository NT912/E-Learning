"use strict";

require("module-alias/register");
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));
var _courseRoutes = _interopRequireDefault(require("./routes/courseRoutes"));
var _paymentRoutes = _interopRequireDefault(require("./routes/paymentRoutes"));
var _discussionRoutes = _interopRequireDefault(require("./routes/discussionRoutes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// hoặc require('module-alias/register') nếu dùng CommonJS

// Tiếp tục với các thiết lập khác...

// Khởi tạo ứng dụng express và cấu hình như bình thường

_dotenv["default"].config({
  path: ".env.dev"
});
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use("/auth", _authRoutes["default"]);
app.use("/user", _userRoutes["default"]);
app.use("/course", _courseRoutes["default"]);
var PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  return console.log("Server running: http://localhost:".concat(PORT, "/"));
});