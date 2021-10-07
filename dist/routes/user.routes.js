"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrler_1 = require("../controllers/user.ctrler");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.use(verifyToken_1.TokenValidation);
router.route("/").get(user_ctrler_1.readUser).put(user_ctrler_1.updateUser).delete(user_ctrler_1.deleteUser);
router
    .route("/admin/:id")
    .get(verifyToken_1.AdminValidation, user_ctrler_1.readUser)
    .put(verifyToken_1.AdminValidation, user_ctrler_1.updateUser)
    .delete(verifyToken_1.AdminValidation, user_ctrler_1.deleteUser);
router.get("/allUsers", user_ctrler_1.allUsers);
router.get("/upcoming-birthdays", user_ctrler_1.upcomingBDs);
exports.default = router;
//# sourceMappingURL=user.routes.js.map