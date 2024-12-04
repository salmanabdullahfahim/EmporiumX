import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { FlashSaleController } from "./flashsale.controller";

const router = express.Router();

router.post(
  "/create-flash-sale-product",
  auth(UserRole.VENDOR),

  FlashSaleController.createAFlashSale
);

router.get("/", FlashSaleController.getAllFlashSale);

router.get("/:id", FlashSaleController.getAFlashSale);

router.patch(
  "/:id",
  auth(UserRole.VENDOR),

  FlashSaleController.updateAFlashSale
);

export const FlashSaleRoutes = router;
