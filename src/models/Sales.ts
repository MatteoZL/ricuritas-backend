import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Sale = db.define(
  "sale",
  {
    restaurant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    date_time: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    total: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Sale;
