import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
import {
  allOrders,
  createOrder,
  readOrder,
  salesByDate,
  salesByMonth,
  searchByClient,
  searchByRestaurant,
} from "../controllers/ord.ctrler";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").post(createOrder).get(allOrders);

router.route("/:id").get(readOrder);

router.get("/restaurant/:id", searchByRestaurant);

router.get("/client/:id", searchByClient);

router.get("/sales/:start/:end", salesByDate);

router.get("/monthly-sales/:id_product", salesByMonth);

export default router;
