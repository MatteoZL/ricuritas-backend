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
exports.lessSellings = exports.topSellings = exports.dailyProduct = exports.searchByRestaurantCategory = exports.searchByRestaurant = exports.searchByCategory = exports.allProducts = exports.deleteProduct = exports.updateProduct = exports.readProductByRestaurant = exports.readProduct = exports.createProduct = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const cloudinary_1 = require("../libs/cloudinary");
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const Inventory_1 = __importDefault(require("../models/Inventory"));
const Restaurant_1 = __importDefault(require("../models/Restaurant"));
const connection_1 = require("../database/connection");
const Sales_1 = __importDefault(require("../models/Sales"));
const sequelize_1 = require("sequelize");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files } = req;
        // Upload iamge to Cloudinary
        const image = files.image;
        body.image = yield cloudinary_1.uploadImage(image.tempFilePath);
        // Saving new Product
        const product = yield Product_1.default.create(body);
        // Saving units in the inventory
        const restaurants = yield Restaurant_1.default.findAll();
        for (let restaurant of restaurants) {
            yield Inventory_1.default.create({
                product_id: product.getDataValue("id"),
                restaurant_id: restaurant.getDataValue("id"),
                units: body.units,
            });
        }
        res.status(200).json({
            msg: "Producto creado exitosamente",
            product,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.createProduct = createProduct;
// User route, don't show units
const readProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_product } = req.params;
    try {
        if (id_product == "daily") {
            let product = yield exports.dailyProduct();
            res.status(200).json(product);
        }
        else {
            // Searching the product
            const product = yield Product_1.default.findByPk(id_product);
            if (!product)
                res.status(404).json({ msg: `Producto no encontrado` });
            // Looking for a promotion
            const promotion = yield checkPromos(product === null || product === void 0 ? void 0 : product.getDataValue("promotion"));
            product === null || product === void 0 ? void 0 : product.setDataValue("promotion", promotion);
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readProduct = readProduct;
const readProductByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product, id_restaurant } = req.params;
        // Searching the product
        const product = yield Product_1.default.findByPk(id_product);
        if (!product)
            res.status(404).json({ msg: `Producto no encontrado` });
        // Looking for a promotion
        const promotion = yield checkPromos(product === null || product === void 0 ? void 0 : product.getDataValue("promotion"));
        product === null || product === void 0 ? void 0 : product.setDataValue("promotion", promotion);
        // Adds the units that there are
        let inventory = yield Inventory_1.default.findOne({
            where: { product_id: id_product, restaurant_id: id_restaurant },
        });
        product.dataValues.units = inventory ? inventory.getDataValue("units") : 0;
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readProductByRestaurant = readProductByRestaurant;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product, id_restaurant } = req.params;
        const { body, files } = req;
        if (body.promotion == "")
            body.promotion = null;
        if (files) {
            // Upload iamge to Cloudinary
            const image = files.image;
            body.image = yield cloudinary_1.uploadImage(image.tempFilePath);
        }
        const product = yield Product_1.default.findByPk(id_product);
        if (!product)
            return res.status(404).json({ msg: `Producto no encontrado` });
        yield product.update(body);
        let inventory = id_restaurant
            ? yield Inventory_1.default.findOne({
                where: { product_id: id_product, restaurant_id: id_restaurant },
            })
            : null;
        if (inventory) {
            inventory === null || inventory === void 0 ? void 0 : inventory.setDataValue("units", body.units);
            inventory === null || inventory === void 0 ? void 0 : inventory.save();
        }
        else if (id_restaurant) {
            Inventory_1.default.create({
                product_id: id_product,
                restaurant_id: id_restaurant,
                units: body.units,
            });
        }
        product.dataValues.units = inventory ? inventory.getDataValue("units") : 0;
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product } = req.params;
        yield Product_1.default.update({
            available: false,
        }, { where: { id: id_product } });
        //await deleteImage();
        res.status(200).json({ msg: "Borrado exitoso" });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.deleteProduct = deleteProduct;
// User route, don't show units
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll({ order: ["name"] });
        for (let product of products) {
            let category = yield Category_1.default.findByPk(product.getDataValue("category_id"));
            product.dataValues.category_name = category === null || category === void 0 ? void 0 : category.getDataValue("name");
            let promotion = yield checkPromos(product.getDataValue("promotion"));
            product.setDataValue("promotion", promotion);
        }
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.allProducts = allProducts;
// User route, don't show units
const searchByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_category } = req.params;
        const products = yield Product_1.default.findAll({
            where: {
                category_id: id_category,
            },
            order: ["name"],
        });
        for (let product of products) {
            let promotion = yield checkPromos(product.getDataValue("promotion"));
            product.setDataValue("promotion", promotion);
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.searchByCategory = searchByCategory;
const searchByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_restaurant } = req.params;
        const products = yield Product_1.default.findAll({ order: ["name"] });
        for (let product of products) {
            let promotion = yield checkPromos(product.getDataValue("promotion"));
            product.setDataValue("promotion", promotion);
            let inventory = yield Inventory_1.default.findOne({
                where: {
                    product_id: product.getDataValue("id"),
                    restaurant_id: id_restaurant,
                },
            });
            product.dataValues.units = inventory
                ? inventory.getDataValue("units")
                : 0;
        }
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.searchByRestaurant = searchByRestaurant;
const searchByRestaurantCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_restaurant, id_category } = req.params;
        const products = yield Product_1.default.findAll({
            where: {
                category_id: id_category,
            },
            order: ["name"],
        });
        for (let product of products) {
            let promotion = yield checkPromos(product.getDataValue("promotion"));
            product.setDataValue("promotion", promotion);
            let inventory = yield Inventory_1.default.findOne({
                where: {
                    product_id: product.getDataValue("id"),
                    restaurant_id: id_restaurant,
                },
            });
            product.dataValues.units = inventory
                ? inventory.getDataValue("units")
                : 0;
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.searchByRestaurantCategory = searchByRestaurantCategory;
const dailyProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield Product_1.default.findOne({ order: connection_1.db.random() });
    // Looking for a promotion
    const promotion = yield checkPromos(product === null || product === void 0 ? void 0 : product.getDataValue("promotion"));
    product === null || product === void 0 ? void 0 : product.setDataValue("promotion", promotion);
    return product;
});
exports.dailyProduct = dailyProduct;
const topSellings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        let statistics = yield Sales_1.default.findAll({
            attributes: [
                [sequelize_1.Sequelize.fn("sum", sequelize_1.Sequelize.col("total")), "total"],
                "product_id",
            ],
            group: ["product_id"],
            order: sequelize_1.Sequelize.literal("total DESC"),
            limit: number,
        });
        let totals = [];
        let products = [];
        for (let statistic of statistics) {
            totals.push(statistic.getDataValue("total"));
            let product = yield Product_1.default.findByPk(statistic.getDataValue("product_id"));
            products.push(product === null || product === void 0 ? void 0 : product.getDataValue("name"));
        }
        res.json({ products, totals });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.topSellings = topSellings;
const lessSellings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number } = req.params;
    try {
        let statistics = yield Sales_1.default.findAll({
            attributes: [
                [sequelize_1.Sequelize.fn("sum", sequelize_1.Sequelize.col("total")), "total"],
                "product_id",
            ],
            group: ["product_id"],
            order: sequelize_1.Sequelize.literal("total ASC"),
            limit: number,
        });
        let totals = [];
        let products = [];
        for (let statistic of statistics) {
            totals.push(statistic.getDataValue("total"));
            let product = yield Product_1.default.findByPk(statistic.getDataValue("product_id"));
            products.push(product === null || product === void 0 ? void 0 : product.getDataValue("name"));
        }
        res.json({ products, totals });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.lessSellings = lessSellings;
const checkPromos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id == null)
        return null;
    let promotion = yield Promotion_1.default.findByPk(id), today = new Date(), start_date = new Date(promotion === null || promotion === void 0 ? void 0 : promotion.getDataValue("start_date")), end_date = new Date(promotion === null || promotion === void 0 ? void 0 : promotion.getDataValue("end_date"));
    if (today.getTime() < start_date.getTime() ||
        today.getTime() > end_date.getTime())
        return null;
    return promotion;
});
//# sourceMappingURL=prdc.ctrler.js.map