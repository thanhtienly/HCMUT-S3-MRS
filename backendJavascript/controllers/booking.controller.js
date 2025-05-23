const { roomType } = require("../config/constant");
const {
  getUserReservations,
  findBookedTimeSlotOfRoom,
  findOverlapTimeSlot,
  createReservation,
  findReservationById,
  countTimeSlotReservation,
  findTimeSlotReservation,
} = require("../services/booking.service");
const { findRoomById } = require("../services/room.service");
const {
  mergeIndividualTimeSlot,
  mergeGroupBookedTimeSlot,
  convertToUTC7,
} = require("../utils/booking.utils");
const bcrypt = require("bcrypt");

const getListReservationHistory = async (req, res) => {
  const userId = req?.userId;

  try {
    var reservationList = await getUserReservations(userId);

    if (reservationList.length == 0) {
      return res.json({ success: true, data: [] });
    }

    reservationList = await Promise.all(
      reservationList.map(async (reservation) => {
        var currentSeat = await countTimeSlotReservation({
          roomId: reservation.roomId,
          startTime: new Date(reservation.from).getTime(),
          endTime: new Date(reservation.to).getTime(),
        });
        reservation.currentSeat = currentSeat;

        return reservation;
      })
    );

    res.json({
      success: true,
      data: reservationList,
    });
  } catch (error) {
    console.error("Error in getListReservationHistory:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBookedTimeSlot = async (req, res) => {
  const { date, roomId } = req.query;

  /* Check if the search date is not before today  */
  var startOfToday = new Date(new Date().setHours(0, 0, 0));
  if (new Date(date).getTime() < startOfToday.getTime()) {
    return res.status(400).json({
      success: false,
      message: "Invalid date",
    });
  }

  var room = await findRoomById({ id: roomId });

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  /* Find all timeSlot's booked by all students */
  var bookedTimeSlot = await findBookedTimeSlotOfRoom({ roomId, date });

  if (bookedTimeSlot.length == 0) {
    /* Can't find any booked timeSlot */
    return res.json({
      data: [],
      success: true,
    });
  }

  /* Find booked time slot of individual room */
  if (room.type == roomType.individual) {
    bookedTimeSlot = mergeIndividualTimeSlot(bookedTimeSlot);
  } else {
    bookedTimeSlot = mergeGroupBookedTimeSlot(bookedTimeSlot);
  }

  res.json({
    data: bookedTimeSlot,
    success: true,
  });
};

const bookTimeSlot = async (req, res) => {
  var { date, roomId, from, to, secret } = req.body;

  var startTime = new Date(`${date} ${from}`).getTime();
  var endTime = new Date(`${date} ${to}`).getTime();

  if (startTime > endTime) {
    return res.status(400).json({
      success: false,
      message: "End time can't before start time",
    });
  }

  if (startTime < new Date().getTime()) {
    return res.status(400).json({
      success: false,
      message: "Invalid date",
    });
  }

  var overLapBooked = await findOverlapTimeSlot({ roomId, startTime, endTime });

  /* This booking overlaps with exist booking */
  if (overLapBooked.length != 0) {
    return res.status(400).json({
      success: false,
      message: "Overlap time slot",
    });
  }

  try {
    const userId = req.userId;
    const reservation = await createReservation({
      roomId,
      userId,
      startTime,
      endTime,
      secret,
    });

    res.json({
      success: true,
      data: {
        id: reservation["id"],
        roomId: reservation["roomId"],
        userId: reservation["userId"],
        from: convertToUTC7(reservation["from"]),
        to: convertToUTC7(reservation["to"]),
        reservedAt: convertToUTC7(reservation["reservedAt"]),
        state: reservation["state"],
      },
    });
  } catch (error) {
    console.log("Error with create reservation");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const joinTimeSlot = async (req, res) => {
  const { reservationId, secret } = req.body;
  const userId = req.userId;

  const reservation = await findReservationById({ id: reservationId });

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: "Reservation not found",
    });
  }

  if (reservation.roomType == roomType.individual) {
    return res.status(400).json({
      success: false,
      message: "Can't join individual room",
    });
  }

  /* Current number of participants */
  var timeSlotReservation = await findTimeSlotReservation({
    roomId: reservation.roomId,
    startTime: reservation.from,
    endTime: reservation.to,
  });

  /* Check if user is join the room before or not */
  var isUserJoin = false;
  timeSlotReservation.forEach((reservation) => {
    if (reservation.userId == userId) {
      isUserJoin = true;
    }
  });

  if (isUserJoin) {
    return res.status(400).json({
      success: false,
      message: "Duplicate joining",
    });
  }

  /* Check remaining of the room */
  if (timeSlotReservation.length >= reservation.roomCapacity) {
    return res.status(400).json({
      success: false,
      message: "The room's full",
    });
  }

  const isValidSecret = bcrypt.compareSync(secret, reservation.secret);

  if (!isValidSecret) {
    return res.status(400).json({
      success: false,
      message: "Invalid secret",
    });
  }

  try {
    const newReservation = await createReservation({
      roomId: reservation.roomId,
      userId: userId,
      startTime: reservation.from,
      endTime: reservation.to,
      secret: secret,
    });

    res.json({
      success: true,
      data: {
        id: newReservation["id"],
        roomId: newReservation["roomId"],
        userId: newReservation["userId"],
        from: convertToUTC7(newReservation["from"]),
        to: convertToUTC7(newReservation["to"]),
        reservedAt: convertToUTC7(newReservation["reservedAt"]),
        state: newReservation["state"],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getListReservationHistory,
  getBookedTimeSlot,
  bookTimeSlot,
  joinTimeSlot,
};
