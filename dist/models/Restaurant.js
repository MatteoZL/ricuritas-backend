"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Restaurant = connection_1.db.define("restaurant", {
    location_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    open_time: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
    close_time: {
        allowNull: false,
        type: sequelize_1.DataTypes.NUMBER,
    },
    site: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    available: {
        defaultValue: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, { timestamps: false, freezeTableName: true });
exports.default = Restaurant;
//# sourceMappingURL=Restaurant.js.map