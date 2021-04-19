"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const loc_ctrler_1 = require("../controllers/loc.ctrler");
const router = express_1.Router();
router.use(verifyToken_1.TokenValidation);
router.route("/").get(loc_ctrler_1.allLocations);
exports.default = router;
//# sourceMappingURL=loc.routes.js.map