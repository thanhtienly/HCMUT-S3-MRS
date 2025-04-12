const moment = require("moment-timezone");

const convertToUTC7 = (timestamp) => {
  return moment.tz(timestamp, "Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm");
};

const convertTimestampToHHMM = (timestamp) => {
  return moment.tz(timestamp, "Asia/Ho_Chi_Minh").format("HH:mm");
};

const mergeIndividualTimeSlot = (bookedTimeSlot) => {
  var timeSlotMerged = [];
  var tempMerged = bookedTimeSlot[0];

  for (let i = 1; i < bookedTimeSlot.length; i++) {
    /* Check if 2 timeSlot partial overlap, if partial overlap then merge them */
    if (tempMerged["to"] == bookedTimeSlot[i]["from"]) {
      tempMerged["to"] = bookedTimeSlot[i]["to"];
    } else {
      timeSlotMerged.push({
        startTime: convertToUTC7(tempMerged["from"]),
        endTime: convertToUTC7(tempMerged["to"]),
      });
      tempMerged = bookedTimeSlot[i];
    }
  }

  timeSlotMerged.push({
    startTime: convertToUTC7(tempMerged["from"]),
    endTime: convertToUTC7(tempMerged["to"]),
  });

  return timeSlotMerged;
};

const mergeGroupBookedTimeSlot = (bookedTimeSlot = []) => {
  var timeSlotDict = {};

  for (let i = 0; i < bookedTimeSlot.length; i++) {
    var from = bookedTimeSlot[i].from;
    var isTimeSlotExist = timeSlotDict[`${from}`];

    if (isTimeSlotExist) {
      timeSlotDict[`${from}`].currentSeat++;
    } else {
      timeSlotDict[`${from}`] = {
        reservationId: bookedTimeSlot[i].id,
        startTime: convertToUTC7(bookedTimeSlot[i].from),
        endTime: convertToUTC7(bookedTimeSlot[i].to),
        maxSeat: bookedTimeSlot[i].roomCapacity,
        currentSeat: 1,
      };
    }
  }

  return Object.values(timeSlotDict);
};

module.exports = {
  convertToUTC7,
  convertTimestampToHHMM,
  mergeIndividualTimeSlot,
  mergeGroupBookedTimeSlot,
};
