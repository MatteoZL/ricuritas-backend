"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TokenValidation = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        res.status(401).json({ msg: "Access denied " });
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "token_test");
    req.userId = payload.id;
    req.userRole = payload.role;
    next();
};
exports.TokenValidation = TokenValidation;
const AdminValidation = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        res.status(401).json({ msg: "Access denied " });
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "token_test");
    if (payload.role != 1)
        res.status(401).json({ msg: "Access denied " });
    req.userId = payload.id;
    next();
};
exports.AdminValidation = AdminValidation;
//# sourceMappingURL=verifyToken.js.map