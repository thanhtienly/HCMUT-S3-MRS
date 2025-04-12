const { Reservation } = require("../models/Reservation");
const { Room } = require("../models/Room");
const { SelfStudyArea } = require("../models/SelfStudyArea");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const getUserReservations = async (userId) => {
  var reservationList = await Reservation.findAll({
    where: { userId },
    include: [
      {
        model: Room,
        attributes: ["name", "capacity", "description"],
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

  if (reservationList.length == 0) {
    return reservationList;
  }

  reservationList = reservationList.map((reservation) => {
    return {
      id: reservation.id,
      roomId: reservation.roomId,
      pictureLink: reservation.Room?.image,
      building: reservation.Room?.SelfStudyArea?.building,
      floor: reservation.Room?.SelfStudyArea?.floor,
      roomNumber: reservation.Room?.name,
      description: reservation.Room?.description,
      maxSeat: reservation.Room?.capacity,
      from: reservation.from,
      to: reservation.to,
      historyTime: reservation.reservedAt,
    };
  });

  return reservationList;
};

const findReservationById = async ({ id }) => {
  var reservation = await Reservation.findOne({
    where: { id },
    include: [
      {
        model: Room,
      },
    ],
  });

  if (!reservation) {
    return reservation;
  }

  return {
    id: reservation.id,
    roomId: reservation.roomId,
    studentId: reservation.studentId,
    from: reservation.from,
    to: reservation.to,
    reservedAt: reservation.reservedAt,
    secret: reservation.secret,
    state: reservation.state,
    roomType: reservation.Room?.type,
    roomCapacity: reservation.Room?.capacity,
  };
};

const findBookedTimeSlotOfRoom = async ({ roomId, date }) => {
  var startOfSearchDate = new Date(new Date(date).setHours(0, 0, 0)).getTime();
  var endOfSearchDate = new Date(new Date(date).setHours(23, 59, 59)).getTime();

  var reservationList = await Reservation.findAll({
    where: {
      [Op.and]: [
        { roomId: roomId },
        {
          state: "Booked",
        },
        {
          from: {
            [Op.gte]: startOfSearchDate,
          },
        },
        {
          to: {
            [Op.lte]: endOfSearchDate,
          },
        },
      ],
    },
    include: [
      {
        model: Room,
        attributes: ["capacity"],
      },
    ],
    order: [["from", "ASC"]],
  });

  reservationList = reservationList.map((reservation) => {
    return {
      id: reservation.id,
      roomId: reservation.roomId,
      studentId: reservation.studentId,
      from: reservation.from,
      to: reservation.to,
      reservedAt: reservation.reservedAt,
      secret: reservation.secret,
      state: reservation.state,
      roomCapacity: reservation.Room?.capacity,
    };
  });

  return reservationList;
};

const findOverlapTimeSlot = async ({ roomId, startTime, endTime }) => {
  /* Note that: (08:00 -> 09:00) is not overlap with (09:00 -> 10:00) */
  return await Reservation.findAll({
    where: {
      [Op.and]: [
        { roomId },
        {
          state: "Booked",
        },
        {
          [Op.or]: [
            {
              /*
               * Exist reservation (08:00 -> 09:00), new booking (07:30 -> ...)
               * startTime of exist in (startTime -> endTime) of new booking -> reject
               */
              [Op.and]: [
                {
                  from: {
                    [Op.gte]: startTime,
                  },
                },
                {
                  from: {
                    [Op.lt]: endTime,
                  },
                },
              ],
            },
            {
              /*
               * Exist reservation (08:00 -> 09:00), new booking (08:30 -> ...)
               * endTime of exist in (startTime -> endTime) of new booking -> reject
               */
              [Op.and]: [
                {
                  to: {
                    [Op.gt]: startTime,
                  },
                },
                {
                  to: {
                    [Op.lte]: endTime,
                  },
                },
              ],
            },
            {
              /*
               * Exist reservation (08:00 -> 09:00), new booking (07:30 -> 09:30)
               * exist reservation range is subRange of new booking range -> reject
               */
              [Op.and]: [
                {
                  from: {
                    [Op.lte]: startTime,
                  },
                },
                {
                  to: {
                    [Op.gte]: endTime,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  });
};

const countAllOverlapReservation = async ({ roomId, startTime, endTime }) => {
  const overlapReservation = await findOverlapTimeSlot({
    roomId: roomId,
    startTime: startTime,
    endTime: endTime,
  });
  return overlapReservation.length;
};

const createReservation = async ({
  roomId,
  userId,
  startTime,
  endTime,
  secret,
}) => {
  if (secret) {
    secret = bcrypt.hashSync(secret, 10);
  }

  var reservation = await Reservation.create({
    id: uuidv4(),
    roomId: roomId,
    userId: userId,
    from: startTime,
    to: endTime,
    reservedAt: new Date().getTime(),
    secret: secret,
    state: "Booked",
  });
  return reservation;
};

module.exports = {
  getUserReservations,
  findReservationById,
  findBookedTimeSlotOfRoom,
  findOverlapTimeSlot,
  countAllOverlapReservation,
  createReservation,
};
