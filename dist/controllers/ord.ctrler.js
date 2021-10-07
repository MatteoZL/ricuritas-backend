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
exports.salesByMonth = exports.salesByDate = exports.searchByClient = exports.searchByRestaurant = exports.allOrders = exports.readOrder = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const pymt_ctrler_1 = require("../controllers/pymt.ctrler");
const Inventory_1 = __importDefault(require("../models/Inventory"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const Sales_1 = __importDefault(require("../models/Sales"));
const connection_1 = require("../database/connection");
const sequelize_1 = require("sequelize");
const lodash_1 = __importDefault(require("lodash"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        for (let product of body.products_list) {
            let inventory = yield Inventory_1.default.findOne({
                where: {
                    product_id: product.id,
                    restaurant_id: body.restaurant_id,
                },
            });
            let units = (inventory === null || inventory === void 0 ? void 0 : inventory.getDataValue("units")) - product.quantity;
            if (units < 0) {
                res.status(400).json({
                    msg: `No hay suficiente ${product.name}. Inténtalo más tarde`,
                });
            }
            else {
                body.date_time = new Date();
                Inventory_1.default.increment("units", {
                    by: -1 * product.quantity,
                    where: { product_id: product.id, restaurant_id: body.restaurant_id },
                });
                let sale = {
                    product_id: product.id,
                    quantity: product.quantity,
                    total: product.amount,
                    restaurant_id: body.restaurant_id,
                    date_time: body.date_time,
                };
                yield Sales_1.default.create(sale);
            }
        }
        const order = yield Order_1.default.create(body);
        body.order_id = order.getDataValue("id");
        const restaurant = yield Restaurant_1.default.findByPk(body.restaurant_id);
        body.restaurant_name = restaurant === null || restaurant === void 0 ? void 0 : restaurant.getDataValue("site");
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
        console.log(error);
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
const searchByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = yield Order_1.default.findAll({
            where: {
                user_id: id,
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
exports.searchByClient = searchByClient;
const salesByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end } = req.params;
    try {
        const dates_db = yield connection_1.db.query(`SELECT CAST(date_time AS DATE), total FROM "order" WHERE date_time >= '${start}' and date_time < '${end}' GROUP BY id`, { type: sequelize_1.QueryTypes.SELECT });
        let dates = [];
        let totals = [];
        for (let date of dates_db) {
            dates.push(date.date_time);
            let currentDate = date.date_time;
            let total = 0;
            for (let eachDate of dates_db) {
                if (eachDate.date_time == currentDate) {
                    total += eachDate.total;
                }
            }
            totals.push(total);
        }
        res.status(200).json({ dates: lodash_1.default.uniq(dates), totals: lodash_1.default.uniq(totals) });
    }
    catch (error) {
        res.status(500).json({ msg: "Comunicarse con Matteo" });
        console.log(error);
    }
});
exports.salesByDate = salesByDate;
const salesByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_product } = req.params;
    let dateNow = new Date();
    let month = dateNow.getMonth() - 6;
    dateNow.setMonth(month);
    let validDate = dateNow.toLocaleDateString();
    let orders = yield connection_1.db.query(`SELECT quantity, EXTRACT(MONTH FROM date_time) AS month FROM sale WHERE product_id = ${id_product} AND date_time >= '${validDate}'`, {
        type: sequelize_1.QueryTypes.SELECT,
    });
    let months = [];
    let quantities = [];
    for (let order of orders) {
        months.push(order.month);
        let currentMonth = order.month;
        let total = 0;
        for (let eachMonth of orders) {
            if (eachMonth.month == currentMonth) {
                total += eachMonth.quantity;
            }
        }
        quantities.push(total);
    }
    res.json({ months: lodash_1.default.uniq(months), quantities: lodash_1.default.uniq(quantities) });
});
exports.salesByMonth = salesByMonth;
//# sourceMappingURL=ord.ctrler.js.map