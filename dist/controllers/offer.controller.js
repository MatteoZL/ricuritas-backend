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
exports.allPromotions = exports.deletePromotion = exports.updatePromotion = exports.readPromotion = exports.createPromotion = void 0;
const Promotion_1 = __importDefault(require("../models/Promotion"));
const createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { start_date, end_date, title, discount, product_id, category_id } = req.body;
        const promotion = yield Promotion_1.default.create({ start_date, end_date, title, discount, product_id, category_id });
        res.status(200).json({
            msg: 'Promocion creado con exito',
            promotion
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
});
exports.createPromotion = createPromotion;
const readPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const promotion = yield Promotion_1.default.findOne({
            where: {
                id,
            },
        });
        !promotion
            ? res.status(400).json({ msg: `Promocion no encontrada` })
            : res.status(200).json(promotion);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
});
exports.readPromotion = readPromotion;
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const promotion = yield Promotion_1.default.findByPk(id);
        if (!promotion)
            return res.status(400).json({ msg: 'Promocion no encontada' });
        yield promotion.update(body);
        res.status(200).json({
            msg: 'Cateogoria actualizada con exito',
            promotion
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
});
exports.updatePromotion = updatePromotion;
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Promotion_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ msg: 'Borrado exitoso' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Comunicarse con Matteo',
            error
        });
    }
});
exports.deletePromotion = deletePromotion;
const allPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotions = yield Promotion_1.default.findAll({ order: ['name'] });
        res.json({ promotions });
    }
    catch (error) {
        res.status(500).json({
            msg: "Comunicarse con Matteo",
            error,
        });
    }
});
exports.allPromotions = allPromotions;
//# sourceMappingURL=offer.controller.js.map