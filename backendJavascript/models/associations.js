const { Reservation } = require("./Reservation");
const { Room } = require("./Room");
const { SelfStudyArea } = require("./SelfStudyArea");
const { Comment } = require("./Comment");

Room.belongsTo(SelfStudyArea, {
  foreignKey: "ssaId",
});

Reservation.belongsTo(Room, {
  foreignKey: "roomId",
});

Comment.belongsTo(Room, {
  foreignKey: "roomId",
});
