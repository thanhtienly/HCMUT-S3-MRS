const { Reservation } = require("../models/Reservation");
const { Room } = require("../models/Room");
const { SelfStudyArea } = require("../models/SelfStudyArea");

const getStudentReservations = async (studentId) => {
  return await Reservation.findAll({
    where: { studentId },
    attributes: ["id", "from", "to"], 
    include: [
      {
        model: Room,
        attributes: ["name"], 
        include: [
          {
            model: SelfStudyArea,
            attributes: ["building", "floor"],
          },
        ],
      },
    ],
    order: [["reservedAt", "DESC"]],
  });
};

const getReservationById = async (id) => {
  return await Reservation.findOne({
    where: { id },
    attributes: ["id", "from", "to", "reservedAt", "secret"],
    include: [
      { 
        model: Room,
        attributes: ["name", "capacity", "type"],
        include: [
          {
            model: SelfStudyArea,
            attributes: ["building", "floor"],
          },
        ],
      },
    ],
  });
};

module.exports = { getStudentReservations, getReservationById };