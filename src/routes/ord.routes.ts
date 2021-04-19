import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
import {
  allOrders,
  createOrder,
  readOrder,
  searchByRestaurant,
} from "../controllers/ord.ctrler";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").post(createOrder).get(allOrders);

router.route("/:id").get(readOrder);

router.get("/restaurant/:id", searchByRestaurant);

export default router;
