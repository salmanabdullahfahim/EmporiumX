import { Router } from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/confirmation", paymentController.confirmationController);

router.get(
  "/history",
  auth(UserRole.ADMIN),
  paymentController.getPaymentHistory
);

export const paymentRoutes = router;
