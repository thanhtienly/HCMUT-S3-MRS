const { CheckIn } = require("./CheckIn");
const { Feedback } = require("./Feedback");
const { Repair } = require("./Repair");
const { Reservation } = require("./Reservation");
const { Room } = require("./Room");
const { SelfStudyArea } = require("./SelfStudyArea");
const { Staff } = require("./Staff");
const { Student } = require("./Student");

const { User } = require("./User");

CheckIn.belongsTo(User, {
  foreignKey: "userId",
});

CheckIn.belongsTo(Room, {
  foreignKey: "roomId",
});

Room.belongsTo(SelfStudyArea, {
  foreignKey: "ssaId",
});

Reservation.belongsTo(Student, {
  foreignKey: "studentId",
});

Reservation.belongsTo(Room, {
  foreignKey: "roomId",
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
