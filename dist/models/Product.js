"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Product = connection_1.db.define("product", {
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    image: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    iva: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    available: {
        defaultValue: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    details: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    category_id: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    unit_price: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
    promotion: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Product;
//# sourceMappingURL=Product.js.map