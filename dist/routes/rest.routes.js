"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const rest_ctrler_1 = require("../controllers/rest.ctrler");
const router = express_1.Router();
router.route("/").post(verifyToken_1.AdminValidation, rest_ctrler_1.createRestaurant).get(rest_ctrler_1.allRestaurants);
router
    .use(verifyToken_1.AdminValidation)
    .route("/:id")
    .get(rest_ctrler_1.readRestaurant)
    .put(rest_ctrler_1.updateRestaurant)
    .delete(rest_ctrler_1.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=rest.routes.js.map