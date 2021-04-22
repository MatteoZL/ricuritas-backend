import { Router } from "express";
import { readUser, updateUser, deleteUser, allUsers } from "../controllers/user.ctrler";
import { TokenValidation } from "../libs/verifyToken";

const router: Router = Router();

router.use(TokenValidation);

router.route("/").get(readUser).put(updateUser).delete(deleteUser);

router.get("/allUsers", allUsers);

export default router;
