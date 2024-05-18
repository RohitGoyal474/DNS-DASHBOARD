import { Router } from "express";
import { registerUser, userLogin, userLogout } from "../Controller/User.controller.js";
import { verifyJWT } from "../Middleware/auth.Middleware.js";


const router = Router();

router.route("/Register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT,userLogout);

export default router