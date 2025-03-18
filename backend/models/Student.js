const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Student = sequelize.define(
  "Student",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM("Nam", "Nữ", "Khác"),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

module.exports = { Student };
