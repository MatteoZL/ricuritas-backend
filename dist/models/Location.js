"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Location = connection_1.db.define("location", {
    latitude: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    longitude: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, { timestamps: false, freezeTableName: true });
exports.default = Location;
//# sourceMappingURL=Location.js.map