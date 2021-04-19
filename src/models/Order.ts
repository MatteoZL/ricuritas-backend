import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Order = db.define(
  "order",
  {
    nit: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    restaurant_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    date_time: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    products_list: {
      allowNull: false,
      type: DataTypes.JSONB,
    },
    subtotal: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    iva: {
      allowNull: false,
      type: DataTypes.INTEGER,
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

export default Order;
