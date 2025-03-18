const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Table = sequelize.define(
  "Table",
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
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("individual", "group"),
      allowNull: false,
    },
  },
  {
    tableName: "tables",
    timestamps: false,
  }
);

module.exports = { Table };
