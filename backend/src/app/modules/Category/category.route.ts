import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  auth(UserRole.ADMIN),
  CategoryControllers.createCategory
);

router.patch(
  "/update-category/:id",
  auth(UserRole.ADMIN),
  CategoryControllers.updateCategory
);

router.delete(
  "/delete-category/:id",
  auth(UserRole.ADMIN),
  CategoryControllers.deleteCategory
);

export const CategoryRoutes = router;
