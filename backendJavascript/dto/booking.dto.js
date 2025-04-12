const Joi = require("joi");

const getBookedTimeSlotDTO = Joi.object({
  date: Joi.string().isoDate().required(),
  roomId: Joi.string().required(),
}).required();

const bookTimeSlotDTO = Joi.object({
  date: Joi.string().isoDate().required(),
  roomId: Joi.string().required(),
  from: Joi.string()
    .pattern(/^[0-9]{2}:[0-9]{2}$/)
    .required(),
  to: Joi.string()
    .pattern(/^[0-9]{2}:[0-9]{2}$/)
    .required(),
  secret: Joi.string(),
}).required();

const joinTimeSlotDTO = Joi.object({
  reservationId: Joi.string().required(),
  secret: Joi.string().required(),
}).required();

module.exports = { getBookedTimeSlotDTO, bookTimeSlotDTO, joinTimeSlotDTO };
