const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const CheckIn = sequelize.define(
  "CheckIn",
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    checkedInAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "check_ins",
    timestamps: false,
  }
);

module.exports = { CheckIn };
