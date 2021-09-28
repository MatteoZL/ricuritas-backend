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
} from "../controllers/prdc.ctrler";
import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";

const router: Router = Router();

router.route("/").post(AdminValidation, createProduct).get(allProducts);

router
  .route("/:id")
  .get(readProduct)
  .put(AdminValidation, updateProduct)
  .delete(AdminValidation, deleteProduct);

router.get("/category/:id", searchByCategory);

router.get("/restaurant/:id", searchByRestaurant);

router
  .route("/:id/restaurant/:id_restaurant")
  .get(readProductByRestaurant)
  .put(AdminValidation, updateProduct)
  .delete(AdminValidation, deleteProduct);

router.get(
  "/:product_id/restaurant/:restaurant_id/category/:category_id",
  searchByRestaurantCategory
);

export default router;
