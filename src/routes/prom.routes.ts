import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";
import {
  allPromotions,
  createPromotion,
  deletePromotion,
  readPromotion,
  updatePromotion,
} from "../controllers/prom.ctrler";

const router: Router = Router();

router.route("/").post(AdminValidation, createPromotion).get(allPromotions);

router
  .use(AdminValidation)
  .route("/:id")
  .get(readPromotion)
  .put(updatePromotion)
  .delete(deletePromotion);

export default router;
