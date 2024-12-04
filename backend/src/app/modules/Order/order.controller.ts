import { Request, Response } from "express";

import { OrderService } from "./order.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createOrder = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await OrderService.createOrder(user, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Order created successfully",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
};
