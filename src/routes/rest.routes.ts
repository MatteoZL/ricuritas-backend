import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";
import {
  allRestaurants,
  createRestaurant,
  deleteRestaurant,
  readRestaurant,
  updateRestaurant,
} from "../controllers/rest.ctrler";

const router: Router = Router();

router.route("/").post(AdminValidation, createRestaurant).get(allRestaurants);

router
  .use(AdminValidation)
  .route("/:id")
  .get(readRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

export default router;
