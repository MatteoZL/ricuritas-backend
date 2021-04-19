"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const catg_routes_1 = __importDefault(require("../routes/catg.routes"));
const prdc_routes_1 = __importDefault(require("../routes/prdc.routes"));
const prom_routes_1 = __importDefault(require("../routes/prom.routes"));
const rest_routes_1 = __importDefault(require("../routes/rest.routes"));
const ord_routes_1 = __importDefault(require("../routes/ord.routes"));
router.use("/auth", auth_routes_1.default);
router.use("/user", user_routes_1.default);
router.use("/category", catg_routes_1.default);
router.use("/product", prdc_routes_1.default);
router.use("/promotion", prom_routes_1.default);
router.use("/restaurant", rest_routes_1.default);
router.use("/order", ord_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.routes.js.map