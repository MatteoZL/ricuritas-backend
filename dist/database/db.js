"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
exports.db = new sequelize_typescript_1.Sequelize('ricuritas', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + '../models '],
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //logging: false
});
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.db.authenticate();
        console.log('Database is connected');
    });
}
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map