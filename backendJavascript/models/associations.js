const { Reservation } = require("./Reservation");
const { Room } = require("./Room");
const { SelfStudyArea } = require("./SelfStudyArea");

Room.belongsTo(SelfStudyArea, {
  foreignKey: "ssaId",
});

Reservation.belongsTo(Room, {
  foreignKey: "roomId",
});
