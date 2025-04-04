const express = require("express");
const {
  getListReservationHistory,
  getReservationDetail,
} = require("../controllers/booking.controller");
const {
  authorizedTokenMiddleware,
  isStudentMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Lấy danh sách lịch sử đặt chỗ
router.get(
  "/history",
  authorizedTokenMiddleware,
  isStudentMiddleware,
  getListReservationHistory
);

// Lấy chi tiết thông tin một lịch sử đặt chỗ
router.get(
  "/history/:id",
  authorizedTokenMiddleware,
  isStudentMiddleware,
  getReservationDetail
);

module.exports = router;
