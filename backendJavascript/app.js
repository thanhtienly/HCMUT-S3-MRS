require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ Đặt ở đầu cho dễ đọc
const { sequelize, initDB } = require("./config/database");

const PORT = process.env.PORT || 8000;

/* Import models */
const { Reservation } = require("./models/Reservation");
const { Room } = require("./models/Room");
const { SelfStudyArea } = require("./models/SelfStudyArea");
const { Comment } = require("./models/Comment");
const associations = require("./models/associations");
const { seed } = require("./config/seed");

/* Import routes */
const bookingRoute = require("./routes/booking.route");
const roomRoute = require("./routes/room.route");

const app = express();

/* Middleware */
app.use(express.json());

/* ✅ Cấu hình CORS */
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép frontend truy cập
    credentials: true, // Nếu dùng cookie/session
  })
);

/* Routes */
app.use("/booking", bookingRoute);
app.use("/room", roomRoute);

/* Khởi tạo DB và chạy server */
initDB()
  .then(async () => {
    sequelize.sync({ force: true }).then(async () => {
      await seed();
      console.log("Connected to MySQL");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
