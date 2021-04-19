import {
  allProducts,
  createProduct,
  deleteProduct,
  readProduct,
  searchByCategory,
  updateProduct,
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

export default router;
