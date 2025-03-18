const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Device = sequelize.define(
  "Device",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    function: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "devices",
    timestamps: false,
  }
);

module.exports = { Device };
