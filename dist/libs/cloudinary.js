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
exports.deleteImage = exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "mattezl",
    api_key: 243842342754734,
    api_secret: "s7xSV5BGEp1honbjGCqCKuw_tq0", //process.env.API_SECRET
});
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Upload image
        const res = yield cloudinary_1.default.v2.uploader.upload(file, {
            folder: "ricuritas",
        });
        console.log(res);
        return res.secure_url;
    }
    catch (error) {
        throw error;
    }
});
exports.uploadImage = uploadImage;
// Falta implementar
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield cloudinary_1.default.v2.uploader.destroy(id);
        return res;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteImage = deleteImage;
//# sourceMappingURL=cloudinary.js.map