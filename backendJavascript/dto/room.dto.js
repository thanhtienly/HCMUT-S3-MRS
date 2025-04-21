const Joi = require("joi");

const createRoomCommentDTO = Joi.object({
  content: Joi.string().required(),
}).required();

module.exports = { createRoomCommentDTO };
