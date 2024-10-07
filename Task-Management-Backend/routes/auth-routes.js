import { Router } from "express";
import authCheck from "../middlewares/auth-middleware.js";
import AuthController from "../controllers/auth-controllers.js";
import zValidateRequest from "../middlewares/zod-validator-middleware.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../lib/zod-schema/userSchema.js";
const router = Router();

router.post(
  "/register",
  zValidateRequest(registerUserSchema),
  AuthController.registerUser
);

router.post(
  "/login",
  zValidateRequest(loginUserSchema),
  AuthController.loginUser
);

router.get("/profile", authCheck, AuthController.getUser);

export default router;
