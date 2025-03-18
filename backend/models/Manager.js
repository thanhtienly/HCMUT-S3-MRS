const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Manager = sequelize.define(
  "Manager",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    managerId: {
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
    tableName: "managers",
    timestamps: false,
  }
);

module.exports = { Manager };
