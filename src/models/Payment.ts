import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Payment = db.define(
  "payment",
  {
    order_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    card_num: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    quotas: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    apvl_num: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    apvl_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    entity: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    receipt: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default Payment;
