import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Inventory = db.define(
  "inventory",
  {
    product_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    restaurant_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
    units: {
      allowNull: true,
      unique: false,
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Inventory;
