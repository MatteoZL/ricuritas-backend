import {
  allProducts,
  createProduct,
  deleteProduct,
  readProduct,
  searchByCategory,
  searchByRestaurant,
  updateProduct,
  readProductByRestaurant,
  searchByRestaurantCategory
} from "../controllers/prdc.ctrler";
import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";

const router: Router = Router();

router.route("/").post(AdminValidation, createProduct).get(allProducts);

router
  .route("/:id/:id_restaurant?")
  .get(readProduct)
  .put(AdminValidation, updateProduct)
  .delete(AdminValidation, deleteProduct);

router.get("/category/:id", searchByCategory);

router.get("/restaurant/:id", searchByRestaurant);

router.get("/:id_product/restaurant/:id_restaurant", readProductByRestaurant);

router.get("/:product_id/restaurant/:restaurant_id/category/:category_id", searchByRestaurantCategory);

export default router;
