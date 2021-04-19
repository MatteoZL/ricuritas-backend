"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loc_controller_1 = require("../controllers/loc.controller");
const router = express_1.Router();
router.route('/')
    .post(loc_controller_1.createLocation)
    .get(loc_controller_1.allLocations);
router.route('/:id')
    .get(loc_controller_1.readLocation);
exports.default = router;
//# sourceMappingURL=ubic.routes.js.map