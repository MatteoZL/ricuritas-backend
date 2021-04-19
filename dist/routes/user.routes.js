"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrler_1 = require("../controllers/user.ctrler");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.use(verifyToken_1.TokenValidation);
router.route("/").get(user_ctrler_1.readUser).put(user_ctrler_1.updateUser).delete(user_ctrler_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map