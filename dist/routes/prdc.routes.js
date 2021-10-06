"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prdc_ctrler_1 = require("../controllers/prdc.ctrler");
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.route("/").post(verifyToken_1.AdminValidation, prdc_ctrler_1.createProduct).get(prdc_ctrler_1.allProducts);
router
    .route("/:id_product")
    .get(prdc_ctrler_1.readProduct)
    .put(verifyToken_1.AdminValidation, prdc_ctrler_1.updateProduct)
    .delete(verifyToken_1.AdminValidation, prdc_ctrler_1.deleteProduct);
router.get("/category/:id_category", prdc_ctrler_1.searchByCategory);
router.get("/restaurant/:id_restaurant", prdc_ctrler_1.searchByRestaurant);
router
    .route("/:id_product/restaurant/:id_restaurant")
    .get(prdc_ctrler_1.readProductByRestaurant)
    .put(verifyToken_1.AdminValidation, prdc_ctrler_1.updateProduct)
    .delete(verifyToken_1.AdminValidation, prdc_ctrler_1.deleteProduct);
router.get("/restaurant/:id_restaurant/category/:id_category", prdc_ctrler_1.searchByRestaurantCategory);
router.get("/daily", prdc_ctrler_1.dailyProduct);
exports.default = router;
//# sourceMappingURL=prdc.routes.js.map