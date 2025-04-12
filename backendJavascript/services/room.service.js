const { Room } = require("../models/Room");
const { SelfStudyArea } = require("../models/SelfStudyArea");

const findAllRoom = async () => {
  return await Room.findAll({
    include: [
      {
        model: SelfStudyArea,
        attributes: ["building", "floor"],
      },
    ],
  });
};

const findRoomById = async ({ id }) => {
  return await Room.findOne({
    where: {
      id,
    },
  });
};

const findRoomDetailById = async ({ id }) => {
  return await Room.findOne({
    where: {
      id,
    },
    include: [
      {
        model: SelfStudyArea,
        attributes: ["building", "floor"],
      },
    ],
  });
};

module.exports = { findAllRoom, findRoomById, findRoomDetailById };
