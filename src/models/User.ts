import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const User = db.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
    },
    doc_type: {
      type: DataTypes.STRING,
    },
    doc_num: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    phone_num: {
      type: DataTypes.INTEGER,
    },
    location_id: {
      type: DataTypes.INTEGER,
    },
    birth: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.TEXT,
    },
    available: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default User;
