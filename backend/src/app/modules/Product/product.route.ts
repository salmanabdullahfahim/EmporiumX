import express, { NextFunction, Request, Response } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../../helpers/fileUploader";
import { ProductValidation } from "./product.validation";

const router = express.Router();

router.post(
  "/create-product",
  auth(UserRole.VENDOR),
  fileUploader.upload.array("files"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductValidation.createProduct.parse(JSON.parse(req.body.data));
    return ProductControllers.createProduct(req, res, next);
  }
);

router.patch(
  "/update-product/:id",
  auth(UserRole.VENDOR),

  ProductControllers.updateProduct
);

router.delete(
  "/delete-product/:id",
  auth(UserRole.VENDOR),

  ProductControllers.deleteProduct
);

router.get("/", ProductControllers.getAllProducts);

router.get("/:id", ProductControllers.getProductById);

router.post(
  "/duplicate-product/:id",
  auth(UserRole.VENDOR),
  ProductControllers.duplicateAProduct
);

export const ProductRoutes = router;
