import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  auth(UserRole.CUSTOMER),
  OrderController.createOrder
);

export const OrderRoutes = router;
