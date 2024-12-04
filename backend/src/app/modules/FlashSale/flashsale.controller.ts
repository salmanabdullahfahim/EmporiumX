import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { FlashSaleServices } from "./flashsale.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";

const createAFlashSale = catchAsync(async (req: Request, res: Response) => {
  const result = await FlashSaleServices.createAFlashSale(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Flash Sale created successfully",
    data: result,
  });
});

const getAllFlashSale = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await FlashSaleServices.getAllFlashSale(options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Flash Sale fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAFlashSale = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const result = await FlashSaleServices.getAFlashSale(productId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Flash Sale fetched successfully",
    data: result,
  });
});

const updateAFlashSale = catchAsync(async (req: Request, res: Response) => {
  const { id: productId } = req.params;

  const result = await FlashSaleServices.updateAFlashSale(productId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Flash Sale updated successfully",
    data: result,
  });
});

export const FlashSaleController = {
  createAFlashSale,
  getAllFlashSale,
  getAFlashSale,
  updateAFlashSale,
};
