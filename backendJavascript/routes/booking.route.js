const express = require("express");
const {
  getListReservationHistory,
  getBookedTimeSlot,
  bookTimeSlot,
  joinTimeSlot,
} = require("../controllers/booking.controller");
const {
  authorizedUserIdMiddleware,
} = require("../middlewares/auth.middleware");

const {
  validateBodyBookTimeSlotDTO,
  validateQueryGetTimeSlotDTO,
  validateBodyJoinTimeSlotDTO,
} = require("../middlewares/validation");

const router = express.Router();

// Lấy danh sách lịch sử đặt chỗ
router.get("/history", authorizedUserIdMiddleware, getListReservationHistory);

/* Get booked time slot of specific room in date */
router.get("/time-slot", validateQueryGetTimeSlotDTO, getBookedTimeSlot);

/* Book a time slot of specific room */
router.post(
  "/time-slot",
  authorizedUserIdMiddleware,
  validateBodyBookTimeSlotDTO,
  bookTimeSlot
);

router.post(
  "/join",
  authorizedUserIdMiddleware,
  validateBodyJoinTimeSlotDTO,
  joinTimeSlot
);

module.exports = router;
