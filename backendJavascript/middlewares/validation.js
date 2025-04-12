require("dotenv").config();
const { validateQuery, validateBody } = require("../utils/validation");
const {
  getBookedTimeSlotDTO,
  bookTimeSlotDTO,
  joinTimeSlotDTO,
} = require("../dto/booking.dto");

const validateQueryGetTimeSlotDTO = (req, res, next) => {
  return validateQuery(getBookedTimeSlotDTO, req, res, next);
};

const validateBodyBookTimeSlotDTO = (req, res, next) => {
  return validateBody(bookTimeSlotDTO, req, res, next);
};

const validateBodyJoinTimeSlotDTO = (req, res, next) => {
  return validateBody(joinTimeSlotDTO, req, res, next);
};

module.exports = {
  validateQueryGetTimeSlotDTO,
  validateBodyBookTimeSlotDTO,
  validateBodyJoinTimeSlotDTO,
};
