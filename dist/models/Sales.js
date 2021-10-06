"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Sale = connection_1.db.define("sale", {
    restaurant_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    date_time: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    product_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    total: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Sale;
//# sourceMappingURL=Sales.js.map