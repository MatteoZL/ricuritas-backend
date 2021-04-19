"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const prom_ctrler_1 = require("../controllers/prom.ctrler");
const router = express_1.Router();
router.route("/").post(verifyToken_1.AdminValidation, prom_ctrler_1.createPromotion).get(prom_ctrler_1.allPromotions);
router
    .use(verifyToken_1.AdminValidation)
    .route("/:id")
    .get(prom_ctrler_1.readPromotion)
    .put(prom_ctrler_1.updatePromotion)
    .delete(prom_ctrler_1.deletePromotion);
exports.default = router;
//# sourceMappingURL=prom.routes.js.map