import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controllers";

import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-admin",
  fileUploader.upload.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return UserControllers.createAdmin(req, res, next);
  }
);
router.post(
  "/create-vendor",
  fileUploader.upload.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createVendor.parse(JSON.parse(req.body.data));
    return UserControllers.createVendor(req, res, next);
  }
);
router.post(
  "/create-customer",
  fileUploader.upload.single("file"),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createCustomer.parse(JSON.parse(req.body.data));
    return UserControllers.createCustomer(req, res, next);
  }
);

router.patch(
  "/delete-user/:id",
  auth(UserRole.ADMIN),
  UserControllers.deleteUser
);
router.patch(
  "/suspend-user/:id",
  auth(UserRole.ADMIN),
  UserControllers.suspendUser
);

export const UserRoutes = router;
