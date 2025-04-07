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
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "students",
        key: "studentId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
      allowNull: false,
    },
  },
  {
    tableName: "reservations",
    timestamps: false,
  }
);

module.exports = { Reservation };
