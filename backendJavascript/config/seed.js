const { Reservation } = require("../models/Reservation");
const { Room } = require("../models/Room");
const { SelfStudyArea } = require("../models/SelfStudyArea");
const { roomType } = require("../config/constant");

async function seed() {
  await SelfStudyArea.create({
    id: "1",
    building: "H6",
    floor: "1",
  });

  await Room.bulkCreate([
    {
      id: "1",
      ssaId: "1",
      name: "H6-101",
      capacity: 4,
      type: roomType.mentoring,
      image: "",
      description:
        "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện",
    },
    {
      id: "2",
      ssaId: "1",
      name: "H6-102",
      capacity: 10,
      type: roomType.group,
      image: "",
      description:
        "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện",
    },
    {
      id: "3",
      ssaId: "1",
      name: "H6-103",
      capacity: 1,
      type: roomType.individual,
      image: "",
      description:
        "Phòng học hỗ trợ các thiết bị cơ bản như, đèn bàn, quạt, dây sạc, ổ điện",
    },
  ]);

  await Reservation.bulkCreate([
    {
      id: "1",
      roomId: "1",
      userId: "1",
      from: new Date("2025-04-14T07:30:00").getTime(),
      to: new Date("2025-04-14T07:49:00").getTime(),
      reservedAt: new Date().getTime(),
      secret: "secret1",
    },
    {
      id: "2",
      roomId: "1",
      userId: "2",
      from: new Date("2025-04-14T09:30:00").getTime(),
      to: new Date("2025-04-14T10:03:00").getTime(),
      reservedAt: new Date().getTime() + 100000,
      secret: "secret1",
    },
    {
      id: "3",
      roomId: "1",
      userId: "3",
      from: new Date("2025-04-14T14:30:00").getTime(),
      to: new Date("2025-04-14T16:50:00").getTime(),
      reservedAt: new Date().getTime() + 1000000,
      secret: "secret1",
    },
    {
      id: "4",
      roomId: "2",
      userId: "4",
      from: new Date("2025-04-15T07:30:00").getTime(),
      to: new Date("2025-04-15T07:49:00").getTime(),
      reservedAt: new Date().getTime(),
      secret: "secret2",
    },
    {
      id: "5",
      roomId: "3",
      userId: "5",
      from: new Date("2025-04-15T09:30:00").getTime(),
      to: new Date("2025-04-15T10:03:00").getTime(),
      reservedAt: new Date().getTime(),
      secret: "secret3",
    },
    {
      id: "6",
      roomId: "3",
      userId: "6",
      from: new Date("2025-04-15T14:30:00").getTime(),
      to: new Date("2025-04-15T16:50:00").getTime(),
      reservedAt: new Date().getTime(),
      secret: "secret3",
    },
    {
      id: "7",
      roomId: "1",
      userId: "7",
      from: new Date("2025-04-16T07:30:00").getTime(),
      to: new Date("2025-04-16T07:49:00").getTime(),
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret4",
    },
    {
      id: "8",
      roomId: "2",
      userId: "10",
      from: new Date("2025-04-16T09:30:00").getTime(),
      to: new Date("2025-04-16T10:03:00").getTime(),
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret5",
    },
    {
      id: "9",
      roomId: "3",
      userId: "11",
      from: new Date("2025-04-16T14:30:00").getTime(),
      to: new Date("2025-04-16T16:50:00").getTime(),
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret6",
    },
  ]);
}

module.exports = { seed };
