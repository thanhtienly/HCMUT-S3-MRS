const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Repair = sequelize.define(
  "Repair",
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
    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "staffs",
        key: "staffId",
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
    scheduledAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "repairs",
    timestamps: false,
  }
);

module.exports = { Repair };
