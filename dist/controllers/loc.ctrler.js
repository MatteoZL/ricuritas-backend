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
exports.deleteLocation = exports.updateLocation = exports.readLocation = exports.createLocation = void 0;
const Location_1 = __importDefault(require("../models/Location"));
const createLocation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, address } = data;
    const location = yield Location_1.default.create({ latitude, longitude, address });
    return location;
});
exports.createLocation = createLocation;
const readLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const location = yield Location_1.default.findOne({
        attributes: ["latitude", "longitude", "address"],
        where: {
            id,
        },
    });
    return location;
});
exports.readLocation = readLocation;
const updateLocation = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const location = yield Location_1.default.findByPk(id);
        if (!location)
            throw { custMsg: "Location not found" };
        yield location.update(data);
        return location;
    }
    catch (error) {
        return error;
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Location_1.default.destroy({
        where: {
            id,
        },
    });
});
exports.deleteLocation = deleteLocation;
// Work but is not used in the application.
/*export const allLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.findAll();
    res.json({ locations });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};*/
//# sourceMappingURL=loc.ctrler.js.map