import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryServices } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
};
