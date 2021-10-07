import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";
import {
  allRestaurants,
  bestSelling,
  createRestaurant,
  deleteRestaurant,
  readRestaurant,
  updateRestaurant,
  worstSelling,
} from "../controllers/rest.ctrler";

const router: Router = Router();

router.route("/").post(AdminValidation, createRestaurant).get(allRestaurants);

router
  .use(AdminValidation)
  .route("/:id")
  .get(readRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

router.get("/best/selling", bestSelling);

router.get("/worst/selling", worstSelling);

export default router;
