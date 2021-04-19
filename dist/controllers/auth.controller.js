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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const user_controller_1 = require("../controllers/user.controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("../libs/bcrypt");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Saving new User
        const { body } = req;
        const savedUser = yield user_controller_1.createUser(body);
        // Token
        const token = jsonwebtoken_1.default.sign({ id: savedUser.doc_num, role: savedUser.role }, process.env.TOKEN_SECRET || 'token-test');
        res.header('Authorization', token).json(savedUser);
    }
    catch (error) {
        // Custom error
        if (error.custMsg)
            return res.status(400).json({ msg: error.custMsg });
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search User
        const { email, password } = req.body;
        const user = yield user_controller_1.searchByEmail(email);
        if (!user)
            return res.status(404).json({ msg: 'Correo incorreto' });
        // Compare password
        const correctPassword = yield bcrypt_1.validatePassword(password, user.password);
        if (!correctPassword)
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        // Token
        const token = jsonwebtoken_1.default.sign({ id: user.doc_num, role: user.role }, process.env.TOKEN_SECRET || 'token-test');
        res.header('Authorization', token).json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
});
exports.signin = signin;
//# sourceMappingURL=auth.controller.js.map