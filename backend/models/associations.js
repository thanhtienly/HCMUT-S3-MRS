const { CheckIn } = require("./CheckIn");
const { Device } = require("./Device");
const { Feedback } = require("./Feedback");
const { Manager } = require("./Manager");
const { Repair } = require("./Repair");
const { Reservation } = require("./Reservation");
const { Room } = require("./Room");
const { SelfStudyArea } = require("./SelfStudyArea");
const { Staff } = require("./Staff");
const { Student } = require("./Student");
const { Table } = require("./Table");
const { User } = require("./User");

CheckIn.belongsTo(User, {
  foreignKey: "userId",
});

CheckIn.belongsTo(Room, {
  foreignKey: "roomId",
});

Device.belongsTo(Room, {
  foreignKey: "roomId",
});

Room.belongsTo(SelfStudyArea, {
  foreignKey: "ssaId",
});

Table.belongsTo(Room, {
  foreignKey: "roomId",
});

Reservation.belongsTo(Student, {
  foreignKey: "studentId",
});

Reservation.belongsTo(Table, {
  foreignKey: "tableId",
});

Feedback.belongsTo(Student, {
  foreignKey: "studentId",
});

Feedback.belongsTo(Room, {
  foreignKey: "roomId",
});

Repair.belongsTo(Room, {
  foreignKey: "roomId",
});

Repair.belongsTo(Staff, {
  foreignKey: "staffId",
});
