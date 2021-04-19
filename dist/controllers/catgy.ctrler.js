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
exports.allCategories = exports.deleteCategory = exports.updateCategory = exports.readCategory = exports.createCategory = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = yield Category_1.default.create({ name });
        res.status(200).json({
            msg: "Categoria creada con exito",
            category,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.createCategory = createCategory;
const readCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.default.findOne({
            where: {
                id,
            },
        });
        !category
            ? res.status(400).json({ msg: `Categoria no encontrada` })
            : res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.readCategory = readCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const category = yield Category_1.default.findByPk(id);
        if (!category)
            return res.status(400).json({ msg: "Categoria no encontada" });
        yield category.update(body);
        res.status(200).json({
            msg: "Cateogoria actualizada con exito",
            category,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const activeProducts = yield Product_1.default.findAll({
            where: { category_id: id, available: true },
        });
        if (activeProducts.length > 0)
            res
                .status(400)
                .json({
                msg: "No puedes borrar categorías que tengan productos activos",
            });
        yield Product_1.default.update({ category_id: null }, { where: { category_id: id } });
        yield Category_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ msg: "Borrado exitoso" });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.deleteCategory = deleteCategory;
const allCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.findAll({ order: ["name"] });
        res.json({ categories });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.allCategories = allCategories;
//# sourceMappingURL=catgy.ctrler.js.map