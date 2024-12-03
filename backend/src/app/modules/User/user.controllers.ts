import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.services";
import { Request, Response } from "express";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdminIntoDB(req);
  console.log(req.body.data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});
const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createVendorIntoDB(req);
  console.log(req.body.data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vendor created successfully",
    data: result,
  });
});

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createCustomerIntoDB(req);
  console.log(req.body.data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createVendor,
  createCustomer,
};
