"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Inventory = connection_1.db.define("inventory", {
    product_id: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    restaurant_id: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    units: {
        allowNull: true,
        unique: false,
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map