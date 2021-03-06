"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Promotion = connection_1.db.define("promotion", {
    start_date: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    end_date: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    title: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    discount: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { timestamps: false, freezeTableName: true });
exports.default = Promotion;
//# sourceMappingURL=Promotion.js.map