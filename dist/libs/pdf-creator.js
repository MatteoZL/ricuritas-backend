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
exports.createBirthdaysPDF = exports.createOrderPDF = void 0;
// @ts-ignore
const pdf_creator_node_1 = __importDefault(require("pdf-creator-node"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = require("./cloudinary");
function createOrderPDF(order) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let html = fs_extra_1.default.readFileSync("src/libs/bill.html", "utf8");
            let values = Object.assign({}, order);
            let document = {
                html,
                data: {
                    values,
                },
                path: `tmp/${order.restaurant_id}.pdf`,
            };
            let options = {
                format: "A3",
                orientation: "portrait",
                border: "10mm",
            };
            yield pdf_creator_node_1.default.create(document, options);
            const receipt = yield cloudinary_1.uploadImage(document.path);
            return receipt;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createOrderPDF = createOrderPDF;
function createBirthdaysPDF(users) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let html = fs_extra_1.default.readFileSync("src/libs/birthdays.html", "utf8");
            let values = Object.assign({}, users);
            let random = Math.floor(Math.random() * 1000);
            let document = {
                html,
                data: {
                    values,
                },
                path: `tmp/${random}.pdf`,
            };
            let options = {
                format: "A3",
                orientation: "portrait",
                border: "10mm",
            };
            yield pdf_creator_node_1.default.create(document, options);
            const doc = yield cloudinary_1.uploadImage(document.path);
            return doc;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createBirthdaysPDF = createBirthdaysPDF;
//# sourceMappingURL=pdf-creator.js.map