"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const promotion_controller_1 = require("../controllers/promotion.controller");
const router = express_1.Router();
router.use(verifyToken_1.AdminValidation);
router.route('/')
    .post(promotion_controller_1.createPromotion)
    .get(promotion_controller_1.allPromotions);
router.route('/:id')
    .get(promotion_controller_1.readPromotion)
    .put(promotion_controller_1.updatePromotion)
    .delete(promotion_controller_1.deletePromotion);
exports.default = router;
//# sourceMappingURL=offer.routes.js.map