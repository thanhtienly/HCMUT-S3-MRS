const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SelfStudyArea = sequelize.define(
  "SelfStudyArea",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    building: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "self_study_areas",
    timestamps: false,
  }
);

module.exports = { SelfStudyArea };
