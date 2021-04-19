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
exports.searchByRestaurant = exports.allOrders = exports.readOrder = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const pymt_ctrler_1 = require("../controllers/pymt.ctrler");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        body.date_time = new Date();
        const order = yield Order_1.default.create(body);
        body.order_id = yield order.getDataValue("id");
        const payment = yield pymt_ctrler_1.createPayment(body);
        res.status(200).json({
            msg: "Orden creada exitosamente",
            order,
            payment,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.createOrder = createOrder;
const readOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield Order_1.default.findByPk(id);
        const payments = yield pymt_ctrler_1.readPayment(id);
        !order
            ? res.status(404).json({ msg: "Orden no encontrada" })
            : res.status(200).json({ order, payments });
    }
    catch (error) {
        res.status(500).json({ msg: "Comunicarse con Matteo" });
    }
});
exports.readOrder = readOrder;
const allOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.findAll();
        const fullOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            let payments = yield pymt_ctrler_1.readPayment(order.getDataValue("id"));
            fullOrders.push({ order, payments });
        }
        res.status(200).json({ fullOrders });
    }
    catch (error) {
        res.status(500).json({ msg: "Comunicarse con Matteo" });
    }
});
exports.allOrders = allOrders;
const searchByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = yield Order_1.default.findAll({
            where: {
                restaurant_id: id,
            },
        });
        const fullOrders = [];
        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            let payments = yield pymt_ctrler_1.readPayment(order.getDataValue("id"));
            fullOrders.push({ order, payments });
        }
        res.status(200).json({ fullOrders });
    }
    catch (error) {
        res.status(500).json({ msg: "Comunicarse con Matteo" });
    }
});
exports.searchByRestaurant = searchByRestaurant;
//# sourceMappingURL=ord.ctrler.js.map