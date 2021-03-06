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
exports.searchByCategory = exports.allProducts = exports.deleteProduct = exports.updateProduct = exports.readProduct = exports.createProduct = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const cloudinary_1 = require("../libs/cloudinary");
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body, files } = req;
        // Upload iamge to Cloudinary
        const image = files.image;
        body.image = yield cloudinary_1.uploadImage(image.tempFilePath);
        // Saving new Product
        const product = yield Product_1.default.create(body);
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
const readProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Searching the product
        const product = yield Product_1.default.findByPk(id);
        if (!product)
            res.status(404).json({ msg: `Producto no encontrado` });
        // Looking for a promotion
        const promotion = yield checkPromos(product === null || product === void 0 ? void 0 : product.getDataValue("promotion"));
        product === null || product === void 0 ? void 0 : product.setDataValue("promotion", promotion);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readProduct = readProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body, files } = req;
        if (body.promotion == "")
            body.promotion = null;
        if (files) {
            // Upload iamge to Cloudinary
            const image = files.image;
            body.image = yield cloudinary_1.uploadImage(image.tempFilePath);
        }
        const product = yield Product_1.default.findByPk(id);
        if (!product)
            return res.status(404).json({ msg: `Producto no encontrado` });
        yield product.update(body);
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
        const { id } = req.params;
        yield Product_1.default.update({
            available: false,
        }, { where: { id } });
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
const searchByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield Product_1.default.findAll({
            where: {
                category_id: id,
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