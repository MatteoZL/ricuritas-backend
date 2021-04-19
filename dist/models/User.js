"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const User = connection_1.db.define("user", {
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    doc_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    doc_num: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    phone_num: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    birth: {
        type: sequelize_1.DataTypes.DATE,
    },
    role: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    email: {
        type: sequelize_1.DataTypes.TEXT,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
    },
    available: {
        defaultValue: true,
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = User;
//# sourceMappingURL=User.js.map