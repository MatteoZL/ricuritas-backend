"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const catgy_ctrler_1 = require("../controllers/catgy.ctrler");
const router = express_1.Router();
router.route("/").post(verifyToken_1.AdminValidation, catgy_ctrler_1.createCategory).get(catgy_ctrler_1.allCategories);
router
    .use(verifyToken_1.AdminValidation)
    .route("/:id")
    .get(catgy_ctrler_1.readCategory)
    .put(catgy_ctrler_1.updateCategory)
    .delete(catgy_ctrler_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=catg.routes.js.map