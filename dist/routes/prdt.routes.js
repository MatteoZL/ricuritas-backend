"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prdc_ctrler_1 = require("../controllers/prdc.ctrler");
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.use(verifyToken_1.AdminValidation);
router.route('/')
    .post(prdc_ctrler_1.createProduct)
    .get(prdc_ctrler_1.allProducts);
router.route('/:id')
    .get(prdc_ctrler_1.readProduct)
    .put(prdc_ctrler_1.updateProduct)
    .delete(prdc_ctrler_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=prdt.routes.js.map