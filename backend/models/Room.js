const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    ssaId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  }
);

module.exports = { Room };
