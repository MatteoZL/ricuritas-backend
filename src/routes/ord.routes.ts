import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
import {
  allOrders,
  createOrder,
  readOrder,
  searchByClient,
  searchByRestaurant,
} from "../controllers/ord.ctrler";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").post(createOrder).get(allOrders);

router.route("/:id").get(readOrder);

router.get("/restaurant/:id", searchByRestaurant);

router.get("/client/:id", searchByClient);

export default router;
