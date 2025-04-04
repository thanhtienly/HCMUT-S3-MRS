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
    studentId: {
      type: DataTypes.UUID,
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
  },
  {
    tableName: "reservations",
    timestamps: false,
  }
);

module.exports = { Reservation };
