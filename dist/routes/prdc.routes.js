"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prdc_ctrler_1 = require("../controllers/prdc.ctrler");
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.route("/").post(verifyToken_1.AdminValidation, prdc_ctrler_1.createProduct).get(prdc_ctrler_1.allProducts);
router
    .route("/:id")
    .get(prdc_ctrler_1.readProduct)
    .put(verifyToken_1.AdminValidation, prdc_ctrler_1.updateProduct)
    .delete(verifyToken_1.AdminValidation, prdc_ctrler_1.deleteProduct);
router.get("/category/:id", prdc_ctrler_1.searchByCategory);
router.get("/restaurant/:id", prdc_ctrler_1.searchByRestaurant);
router
    .route("/:id/restaurant/:id_restaurant")
    .get(prdc_ctrler_1.readProductByRestaurant)
    .put(verifyToken_1.AdminValidation, prdc_ctrler_1.updateProduct)
    .delete(verifyToken_1.AdminValidation, prdc_ctrler_1.deleteProduct);
router.get("/:product_id/restaurant/:restaurant_id/category/:category_id", prdc_ctrler_1.searchByRestaurantCategory);
exports.default = router;
//# sourceMappingURL=prdc.routes.js.map