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
exports.searchByEmail = exports.allUsers = exports.deleteUser = exports.updateUser = exports.readUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const loc_ctrler_1 = require("./loc.ctrler");
const bcrypt_1 = require("../libs/bcrypt");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Saving new Location
        const location = yield loc_ctrler_1.createLocation(data);
        // Adding the id location for the new User
        data.location_id = location.getDataValue("id");
        // Encrypt Password
        let passToEncrypt = data.password;
        data.password = yield bcrypt_1.encryptPassword(passToEncrypt);
        // Saving new User
        const user = yield User_1.default.create(data);
        return user;
    }
    catch (error) {
        // Delete the previously created location
        yield loc_ctrler_1.deleteLocation(data.location_id);
        // Error handling
        switch (error.parent.constraint) {
            case "user_pkey":
                throw { custMsg: "Ya exste un usuario con ese número de documento" };
            case "user_phone_num_key":
                throw { custMsg: "Ya exste un usuario con ese número de telefónico" };
            case "user_email_key":
                throw { custMsg: "Ya exste un usuario con ese correo electrónico" };
            default:
                return error;
        }
    }
    // custMsg: Custom Message, mensaje personalizado
});
exports.createUser = createUser;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const user = yield User_1.default.findByPk(id);
        const location = yield loc_ctrler_1.readLocation(user === null || user === void 0 ? void 0 : user.getDataValue("location_id"));
        !user
            ? res.status(404).json({ msg: `Usuario no encontrado con el id ${id}` })
            : res
                .status(200)
                .json(Object.assign(user.dataValues, location.dataValues));
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readUser = readUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const { body } = req;
        const user = yield User_1.default.findByPk(id);
        if (!user)
            return res
                .status(404)
                .json({ msg: `Usuario no encontrado con el id ${id}` });
        // Update Location
        const newLoc = yield loc_ctrler_1.updateLocation(user.location_id, body);
        // Encrypt Password
        let passToEncrypt = body.password;
        body.password = yield bcrypt_1.encryptPassword(passToEncrypt);
        yield user.update(body);
        res.status(200).json({
            msg: "Usuario actualizado con éxito",
            user: Object.assign(user.dataValues, newLoc.dataValues),
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        // Logical deletion
        yield User_1.default.update({ available: false }, { where: { doc_num: id } });
        res.status(200).json({ msg: "Borrado exitoso" });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.deleteUser = deleteUser;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll({ order: ["name"] });
        for (let user of users) {
            let location = yield loc_ctrler_1.readLocation(user.getDataValue("location_id"));
            user.dataValues.location = location;
        }
        res.status(200).json({ users });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.allUsers = allUsers;
const searchByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        where: {
            email,
            available: true,
        },
    });
    if (user) {
        return user;
    }
    return null;
});
exports.searchByEmail = searchByEmail;
//# sourceMappingURL=user.ctrler.js.map