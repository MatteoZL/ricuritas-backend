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
exports.allLocations = exports.updateLocation = exports.readLocation = exports.createLocation = void 0;
const Ubicacion_1 = __importDefault(require("../models/Ubicacion"));
const createLocation = (req, res) => {
    try {
        console.log(req.body);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
};
exports.createLocation = createLocation;
const readLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const location = yield Ubicacion_1.default.findByPk(id);
    res.json({ location });
});
exports.readLocation = readLocation;
const updateLocation = (req, res) => {
    res.send('profile');
};
exports.updateLocation = updateLocation;
const allLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield Ubicacion_1.default.findAll();
    res.json({ locations });
});
exports.allLocations = allLocations;
//# sourceMappingURL=ubic.controller.js.map