const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Staff = sequelize.define(
  "Staff",
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    staffId: {
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
    tableName: "staffs",
    timestamps: false,
  }
);

module.exports = { Staff };
