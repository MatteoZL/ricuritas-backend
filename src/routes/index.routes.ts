import { Router } from "express";

const router: Router = Router();

import authentication from "../routes/auth.routes";
import user from "../routes/user.routes";
import category from "../routes/catg.routes";
import product from "../routes/prdc.routes";
import promotion from "../routes/prom.routes";
import restaurant from "../routes/rest.routes";
import order from "../routes/ord.routes";

router.use("/auth", authentication);
router.use("/user", user);
router.use("/category", category);
router.use("/product", product);
router.use("/promotion", promotion);
router.use("/restaurant", restaurant);
router.use("/order", order);

export default router;