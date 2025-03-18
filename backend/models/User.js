const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    verfiedAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("Student", "Manager", "Staff"),
      allowNull: false,
      defaultValue: "Student",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = { User };
