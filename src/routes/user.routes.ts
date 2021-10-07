import { Router } from "express";
import {
  readUser,
  updateUser,
  deleteUser,
  allUsers,
  upcomingBDs,
} from "../controllers/user.ctrler";
import { AdminValidation, TokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").get(readUser).put(updateUser).delete(deleteUser);

router
  .route("/admin/:id")
  .get(AdminValidation, readUser)
  .put(AdminValidation, updateUser)
  .delete(AdminValidation, deleteUser);

router.get("/allUsers", allUsers);

router.get("/upcoming-birthdays", upcomingBDs);

export default router;
