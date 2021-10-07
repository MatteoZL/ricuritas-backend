"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const ord_ctrler_1 = require("../controllers/ord.ctrler");
const router = express_1.Router();
router.use(verifyToken_1.TokenValidation);
router.route("/").post(ord_ctrler_1.createOrder).get(ord_ctrler_1.allOrders);
router.route("/:id").get(ord_ctrler_1.readOrder);
router.get("/restaurant/:id", ord_ctrler_1.searchByRestaurant);
router.get("/client/:id", ord_ctrler_1.searchByClient);
router.get("/sales/:start/:end", ord_ctrler_1.salesByDate);
router.get("/monthly-sales/:id_product", ord_ctrler_1.salesByMonth);
exports.default = router;
//# sourceMappingURL=ord.routes.js.map