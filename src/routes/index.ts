import { Router } from "express";
import {
  register,
  login,
  authenticatedUser,
  logout,
  updateInfo,
  updatePassword,
} from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const routes = (router: Router) => {
  router.post("/api/register", register);
  router.post("/api/login", login);
  router.get("/api/user", authMiddleware, authenticatedUser);
  router.post("/api/logout", authMiddleware, logout);
  router.put("/api/users/info", authMiddleware, updateInfo);
  router.put("/api/users/password", authMiddleware, updatePassword);
};
