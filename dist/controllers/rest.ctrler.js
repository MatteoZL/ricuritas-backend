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
exports.worstSelling = exports.bestSelling = exports.allRestaurants = exports.deleteRestaurant = exports.updateRestaurant = exports.readRestaurant = exports.createRestaurant = void 0;
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const loc_ctrler_1 = require("../controllers/loc.ctrler");
const sequelize_1 = require("sequelize");
const Sales_1 = __importDefault(require("../models/Sales"));
const sequelize_2 = require("sequelize");
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        // Saving new Location
        const location = yield loc_ctrler_1.createLocation(body);
        // Adding the new Location
        body.location_id = location.getDataValue("id");
        // Saving new Restaurant
        const restaurant = yield Restaurant_1.default.create(body);
        res.status(200).json({
            msg: "Sede restaurante creada con exito",
            restaurant,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.createRestaurant = createRestaurant;
const readRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id == "open") {
            let now = new Date().getHours();
            const restaurants = yield Restaurant_1.default.findAll({
                where: {
                    open_time: { [sequelize_1.Op.lt]: now },
                    close_time: { [sequelize_1.Op.gte]: now },
                },
            });
            for (let restaurant of restaurants) {
                const location = yield loc_ctrler_1.readLocation(restaurant === null || restaurant === void 0 ? void 0 : restaurant.getDataValue("location_id"));
                restaurant.dataValues.location = location;
            }
            res.status(200).json(restaurants);
        }
        else {
            const restaurant = yield Restaurant_1.default.findByPk(id);
            const location = yield loc_ctrler_1.readLocation(restaurant === null || restaurant === void 0 ? void 0 : restaurant.getDataValue("location_id"));
            !restaurant
                ? res.status(400).json({ msg: `Sede restaurante no encontrada` })
                : res
                    .status(200)
                    .json(Object.assign(restaurant.dataValues, location.dataValues));
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readRestaurant = readRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const restaurant = yield Restaurant_1.default.findByPk(id);
        if (!restaurant)
            return res.status(400).json({ msg: "Sede restaurante no encontada" });
        // Update Location
        const newLoc = yield loc_ctrler_1.updateLocation(restaurant.getDataValue("location_id"), body);
        yield restaurant.update(body);
        res.status(200).json({
            msg: "Sede Restaurante actualizada con exito",
            restaurant: Object.assign(restaurant.dataValues, newLoc.dataValues),
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Logical deletion
        yield Restaurant_1.default.update({ available: false }, { where: { id } });
        res.status(200).json({ msg: "Borrado exitoso" });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.deleteRestaurant = deleteRestaurant;
const allRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restData = yield Restaurant_1.default.findAll({ order: ["site"] });
        const restaurants = [];
        for (let i = 0; i < restData.length; i++) {
            const restaurant = restData[i];
            const location = yield loc_ctrler_1.readLocation(restaurant.getDataValue("location_id"));
            restaurants.push(Object.assign(restaurant.dataValues, location.dataValues));
        }
        res.status(200).json({ restaurants });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.allRestaurants = allRestaurants;
const bestSelling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let statistics = yield Sales_1.default.findAll({
            attributes: [
                [sequelize_2.Sequelize.fn("sum", sequelize_2.Sequelize.col("total")), "total"],
                "restaurant_id",
            ],
            group: ["restaurant_id"],
            order: sequelize_2.Sequelize.literal("total DESC"),
        });
        let totals = [];
        let restaurants = [];
        for (let statistic of statistics) {
            totals.push(statistic.getDataValue("total"));
            let product = yield Restaurant_1.default.findByPk(statistic.getDataValue("restaurant_id"));
            restaurants.push(product === null || product === void 0 ? void 0 : product.getDataValue("site"));
        }
        res.json({ restaurants, totals });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.bestSelling = bestSelling;
const worstSelling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let statistics = yield Sales_1.default.findAll({
            attributes: [
                [sequelize_2.Sequelize.fn("sum", sequelize_2.Sequelize.col("total")), "total"],
                "restaurant_id",
            ],
            group: ["restaurant_id"],
            order: sequelize_2.Sequelize.literal("total ASC"),
        });
        let totals = [];
        let restaurants = [];
        for (let statistic of statistics) {
            totals.push(statistic.getDataValue("total"));
            let product = yield Restaurant_1.default.findByPk(statistic.getDataValue("restaurant_id"));
            restaurants.push(product === null || product === void 0 ? void 0 : product.getDataValue("site"));
        }
        res.json({ restaurants, totals });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.worstSelling = worstSelling;
//# sourceMappingURL=rest.ctrler.js.map