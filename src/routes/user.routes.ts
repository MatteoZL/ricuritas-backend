import { Router } from "express";
import { readUser, updateUser, deleteUser } from "../controllers/user.ctrler";
import { TokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").get(readUser).put(updateUser).delete(deleteUser);

export default router;
