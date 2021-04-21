"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Category = connection_1.db.define("category", {
    name: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
exports.default = Category;
//# sourceMappingURL=Category.js.map