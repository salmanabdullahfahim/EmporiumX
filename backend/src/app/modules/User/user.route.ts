import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controllers";

import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";

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

export const UserRoutes = router;
