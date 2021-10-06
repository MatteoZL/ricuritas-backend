"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prom_ctrler_1 = require("../controllers/prom.ctrler");
const router = express_1.Router();
router.route("/").get(prom_ctrler_1.promotionsProducts);
exports.default = router;
//# sourceMappingURL=asst.routes.js.map