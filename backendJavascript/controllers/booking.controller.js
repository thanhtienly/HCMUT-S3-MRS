const {
  getStudentReservations,
  getReservationById,
} = require("../services/booking.service");
const moment = require("moment-timezone");

const convertToUTC7 = (timestamp) => {
  return moment.tz(timestamp, "Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
};

const getListReservationHistory = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    if (!studentId) {
      return res
        .status(401)
        .json({ success: false, message: "You need to log in!" });
    }

    const reservations = await getStudentReservations(studentId);
    if (!reservations || reservations.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Student has no reservations",
        data: [],
      });
    }

    // Làm phẳng dữ liệu
    const formattedReservations = reservations.map((reservation) => ({
      reservationId: reservation.id,
      startTime: convertToUTC7(reservation.from),
      endTime: convertToUTC7(reservation.to),
      building: reservation.Room?.SelfStudyArea?.building || "Unknown",
      floor: reservation.Room?.SelfStudyArea?.floor || "Unknown",
      roomName: reservation.Room?.name || "Unknown",
    }));

    res.json({ success: true, data: formattedReservations });
  } catch (error) {
    console.error("Error in getListReservationHistory:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getReservationDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationById(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }

    // Làm phẳng dữ liệu
    const formattedReservation = {
      reservationId: reservation.id,
      reservedTimeAt: convertToUTC7(reservation.reservedAt),
      startTime: convertToUTC7(reservation.from),
      endTime: convertToUTC7(reservation.to),
      building: reservation.Room?.SelfStudyArea?.building || "Unknown",
      floor: reservation.Room?.SelfStudyArea?.floor || "Unknown",
      roomName: reservation.Room?.name || "Unknown",
      capacity: reservation.Room?.capacity || 0,
      type: reservation.Room?.type || "Unknown",
    };

    res.json({ success: true, data: formattedReservation });
  } catch (error) {
    console.error("Error in getReservationDetail:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getListReservationHistory, getReservationDetail };
