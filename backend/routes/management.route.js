const express = require("express");
const { getListReservationHistory, getReservationDetail } = require("../controllers/management.controller");
const { authorizedTokenMiddleware, isStudentMiddleware } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/history", authorizedTokenMiddleware, isStudentMiddleware, getListReservationHistory); // Lấy danh sách lịch sử đặt chỗ
router.get("/history/:id", authorizedTokenMiddleware, isStudentMiddleware, getReservationDetail); // Lấy chi tiết thông tin một lịch sử đặt chỗ

module.exports = router;
