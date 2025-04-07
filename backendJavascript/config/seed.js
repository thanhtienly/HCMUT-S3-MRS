const { CheckIn } = require("../models/CheckIn");
const { Feedback } = require("../models/Feedback");
const { Manager } = require("../models/Manager");
const { Repair } = require("../models/Repair");
const { Reservation } = require("../models/Reservation");
const { Room } = require("../models/Room");
const { SelfStudyArea } = require("../models/SelfStudyArea");
const { Staff } = require("../models/Staff");
const { Student } = require("../models/Student");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

async function seed() {
  await User.bulkCreate([
    {
      id: "1",
      email: "student1@hcmut.edu.vn",
      password: bcrypt.hashSync("Taomatkhau", 10),
      role: "Student",
    },
    {
      id: "2",
      email: "manager@hcmut.edu.vn",
      password: bcrypt.hashSync("Taomatkhau", 10),
      role: "Manager",
    },
    {
      id: "3",
      email: "staff@hcmut.edu.vn",
      password: bcrypt.hashSync("Taomatkhau", 10),
      role: "Staff",
    },
    {
      id: "4",
      email: "student2@hcmut.edu.vn",
      password: bcrypt.hashSync("Taomatkhau", 10),
      role: "Student",
    },
  ]);

  await Student.bulkCreate([
    {
      userId: "1",
      studentId: "2212345",
      gender: "Nam",
      firstName: "Test",
      lastName: "Test",
      phone: "0368832210",
      birthday: "2004-01-01",
    },
    {
      userId: "4",
      studentId: "2256789",
      gender: "Nữ",
      firstName: "Test",
      lastName: "Test",
      phone: "0796850161",
      birthday: "2004-01-01",
    },
  ]);

  await Manager.create({
    userId: "2",
    managerId: "1234",
    gender: "Nữ",
    firstName: "Test",
    lastName: "Test",
  });

  await Staff.create({
    userId: "3",
    staffId: "56789",
    gender: "Nam",
    firstName: "Test",
    lastName: "Test",
  });

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
      type: "Mentoring",
      image: "",
    },
    {
      id: "2",
      ssaId: "1",
      name: "H6-102",
      capacity: 10,
      type: "Group",
      image: "",
    },
    {
      id: "3",
      ssaId: "1",
      name: "H6-103",
      capacity: 1,
      type: "Individual",
      image: "",
    },
  ]);

  await Reservation.bulkCreate([
    {
      id: "1",
      roomId: "1",
      studentId: "2212345",
      from: new Date().getTime() + 24 * 60 * 60 * 1000,
      to: new Date().getTime() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime(),
      secret: "secret1",
    },
    {
      id: "2",
      roomId: "2",
      studentId: "2212345",
      from: new Date().getTime() + 24 * 60 * 60 * 1000,
      to: new Date().getTime() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime(),
      secret: "secret2",
    },
    {
      id: "3",
      roomId: "3",
      studentId: "2212345",
      from: new Date().getTime() + 24 * 60 * 60 * 1000,
      to: new Date().getTime() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime(),
      secret: "secret3",
    },

    {
      id: "4",
      roomId: "1",
      studentId: "2256789",
      from: new Date().getTime() - 24 * 60 * 60 * 1000,
      to: new Date().getTime() - 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret4",
    },
    {
      id: "5",
      roomId: "2",
      studentId: "2256789",
      from: new Date().getTime() - 24 * 60 * 60 * 1000,
      to: new Date().getTime() - 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret5",
    },
    {
      id: "6",
      roomId: "3",
      studentId: "2256789",
      from: new Date().getTime() - 24 * 60 * 60 * 1000,
      to: new Date().getTime() - 24 * 60 * 60 * 1000 + 60 * 60 * 1000,
      reservedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
      secret: "secret6",
    },
  ]);
}

module.exports = { seed };
