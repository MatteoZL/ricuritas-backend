import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Location = db.define(
  "location",
  {
    latitude: {
      type: DataTypes.NUMBER,
    },
    longitude: {
      type: DataTypes.NUMBER,
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default Location;
