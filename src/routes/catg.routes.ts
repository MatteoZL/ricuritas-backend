import { Router } from "express";
import { AdminValidation } from "../libs/verifyToken";
import {
  allCategories,
  createCategory,
  deleteCategory,
  readCategory,
  updateCategory,
} from "../controllers/catgy.ctrler";

const router: Router = Router();

router.route("/").post(AdminValidation, createCategory).get(allCategories);

router
  .use(AdminValidation)
  .route("/:id")
  .get(readCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
