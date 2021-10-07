import {
  allProducts,
  createProduct,
  deleteProduct,
  readProduct,
  searchByCategory,
  searchByRestaurant,
  updateProduct,
  readProductByRestaurant,
  searchByRestaurantCategory,
  dailyProduct,
  topSellings,
  lessSellings,
} from "../controllers/prdc.ctrler";
import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";

const router: Router = Router();

router.route("/").post(AdminValidation, createProduct).get(allProducts);

router
  .route("/:id_product")
  .get(readProduct)
  .put(AdminValidation, updateProduct)
  .delete(AdminValidation, deleteProduct);

router.get("/category/:id_category", searchByCategory);

router.get("/restaurant/:id_restaurant", searchByRestaurant);

router
  .route("/:id_product/restaurant/:id_restaurant")
  .get(readProductByRestaurant)
  .put(AdminValidation, updateProduct)
  .delete(AdminValidation, deleteProduct);

router.get(
  "/restaurant/:id_restaurant/category/:id_category",
  searchByRestaurantCategory
);

router.get("/daily", dailyProduct);

router.get("/top-selling/:number", AdminValidation, topSellings);

router.get("/less-selling/:number", AdminValidation, lessSellings);

export default router;
