import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Restaurant = db.define(
  "restaurant",
  {
    location_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    open_time: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    close_time: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    site: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    available: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default Restaurant;
