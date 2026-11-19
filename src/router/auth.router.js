import { Router } from "express";
import authUser from "../middlewares/auth.middleware.js";
import {
  registerController,
  loginController,
  logoutController,
  getmeController,
} from "../controllers/auth.controller.js";

export const authRoute = Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.get("/logout", logoutController);
authRoute.get("/getme", authUser, getmeController);
