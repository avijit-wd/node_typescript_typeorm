import { Router } from "express";
import {
  register,
  login,
  authenticatedUser,
  logout,
  updateInfo,
  updatePassword,
} from "../controller/auth.controller";
import { permissions } from "../controller/permission.controller";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  users,
} from "../controller/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import {
  createRole,
  roles,
  getRole,
  updateRole,
  deleteRole,
} from "../controller/role.controller";
import { products } from "../controller/product.controller";
import { upload } from "../controller/image.controller";
import { extname } from "path";
import multer from "multer";
import { chart, exportCsv, orders } from "../controller/order.controller";

export const routes = (router: Router) => {
  // Auth Routes
  router.post("/api/register", register);
  router.post("/api/login", login);
  router.get("/api/user", authMiddleware, authenticatedUser);
  router.post("/api/logout", authMiddleware, logout);
  router.put("/api/users/info", authMiddleware, updateInfo);
  router.put("/api/users/password", authMiddleware, updatePassword);

  // User CRUD routes
  router.get(
    "/api/users",
    authMiddleware,
    permissionMiddleware("users"),
    users
  );
  router.post(
    "/api/users",
    authMiddleware,
    permissionMiddleware("users"),
    createUser
  );
  router.get(
    "/api/users/:id",
    authMiddleware,
    permissionMiddleware("users"),
    getUser
  );
  router.put(
    "/api/users/:id",
    authMiddleware,
    permissionMiddleware("users"),
    updateUser
  );
  router.delete(
    "/api/users/:id",
    authMiddleware,
    permissionMiddleware("users"),
    deleteUser
  );

  // Permissions
  router.get("/api/permissions", authMiddleware, permissions);

  //Roles
  router.get("/api/roles", authMiddleware, roles);
  router.post("/api/create-role", authMiddleware, createRole);
  router.get("/api/roles/:id", authMiddleware, getRole);
  router.put("/api/roles/:id", authMiddleware, updateRole);
  router.delete("/api/roles/:id", authMiddleware, deleteRole);

  //Product
  router.get(
    "/api/products",
    authMiddleware,
    permissionMiddleware("products"),
    products
  );
  router.post(
    "/api/products",
    authMiddleware,
    permissionMiddleware("products"),
    products
  );
  router.get(
    "/api/products/:id",
    authMiddleware,
    permissionMiddleware("products"),
    products
  );
  router.put(
    "/api/products/:id",
    authMiddleware,
    permissionMiddleware("products"),
    products
  );
  router.delete(
    "/api/products/:id",
    authMiddleware,
    permissionMiddleware("products"),
    products
  );

  //Image Upload

  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (_: Request, file: any, cb) {
      const randomName = Math.random().toString(20).substring(2, 12);
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });
  router.post(
    "/api/uploads",
    authMiddleware,
    multer({ storage }).single("image"),
    upload
  );

  // Orders
  router.get("/api/orders", authMiddleware, orders);
  // Export Csv
  router.post("/api/export-csv", authMiddleware, exportCsv);

  router.get("/api/chart", authMiddleware, chart);
};
