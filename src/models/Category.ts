import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Category = db.define(
  "category",
  {
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Category;
