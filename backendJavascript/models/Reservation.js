const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    to: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    reservedAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.ENUM(["Booked", "Cancelled", "Expired"]),
      defaultValue: "Booked",
      allowNull: false,
    },
  },
  {
    tableName: "reservations",
    timestamps: false,
  }
);

module.exports = { Reservation };
