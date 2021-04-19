import { DataTypes } from "sequelize";
import { db } from "../database/connection";

const Product = db.define(
  "product",
  {
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    iva: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    available: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    details: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    category_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    units: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    unit_price: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    promotion: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Product;
