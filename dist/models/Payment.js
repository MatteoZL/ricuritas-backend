"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Payment = connection_1.db.define("payment", {
    order_id: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    method: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    card_num: {
        allowNull: true,
        type: sequelize_1.DataTypes.NUMBER,
    },
    quotas: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    apvl_num: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    apvl_date: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    entity: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    receipt: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { timestamps: false, freezeTableName: true });
exports.default = Payment;
//# sourceMappingURL=Payment.js.map