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
exports.readPayment = exports.createPayment = void 0;
const Payment_1 = __importDefault(require("../models/Payment"));
const pdf_creator_1 = __importDefault(require("../libs/pdf-creator"));
const createPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.method == "efectivo")
        return yield Payment_1.default.create(data);
    data.apvl_num = Math.floor(Math.random() * 100);
    data.apvl_date = new Date();
    data.receipt = yield pdf_creator_1.default(data);
    const payment = yield Payment_1.default.create(data);
    return payment;
});
exports.createPayment = createPayment;
const readPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield Payment_1.default.findAll({
        attributes: [
            "method",
            "card_num",
            "quotas",
            "apvl_num",
            "apvl_date",
            "entity",
            "receipt"
        ],
        where: {
            order_id: id,
        },
    });
    return payments;
});
exports.readPayment = readPayment;
//# sourceMappingURL=pymt.ctrler.js.map