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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
