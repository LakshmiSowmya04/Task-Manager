import { Router } from "express";
import AuthController from "../controllers/auth.js";
const router = Router();

router.post("/register", AuthController.registerUser);

router.post("/login", AuthController.loginUser);

export default router;
