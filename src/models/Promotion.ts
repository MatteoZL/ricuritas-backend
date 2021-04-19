import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Promotion = db.define(
  "promotion",
  {
    start_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    end_date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    discount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default Promotion;
