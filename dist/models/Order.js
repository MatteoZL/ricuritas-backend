"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Order = connection_1.db.define("order", {
    nit: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    restaurant_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    user_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
    date_time: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    products_list: {
        allowNull: false,
        type: sequelize_1.DataTypes.JSONB,
    },
    subtotal: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
    iva: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    total: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Order;
//# sourceMappingURL=Order.js.map