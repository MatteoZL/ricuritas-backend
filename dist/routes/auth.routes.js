"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_ctrler_1 = require("../controllers/auth.ctrler");
const router = express_1.Router();
router.post("/signup", auth_ctrler_1.signup);
router.post("/signin", auth_ctrler_1.signin);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map