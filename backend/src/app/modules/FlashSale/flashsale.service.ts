import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { TPaginationOptions } from "../../interfaces/pagination";
import { IFlashSale } from "./flashsale.type";

const createAFlashSale = async (flashSale: IFlashSale) => {
  //  Create flash sale
  return await prisma.flashSale.create({
    data: flashSale,
  });
};

const getAllFlashSale = async (options: TPaginationOptions) => {
  // create pagination condition
  // get product data
  // get meta data
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const now = new Date(new Date().toISOString());

  const result = await prisma.flashSale.findMany({
    where: {
      OR: [
        {
          // Active flash sales
          startTime: { lte: now },
          endTime: { gte: now },
        },
        {
          // Upcoming flash sales
          startTime: { gt: now },
        },
      ],
    },
    include: { product: true },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { startTime: "desc" },
  });

  const total = await prisma.flashSale.count({
    where: {
      startTime: { lte: new Date() },
      endTime: { gte: new Date() },
    },
  });

  return {
    data: result,
    meta: { page, limit, total },
  };
};

const getAFlashSale = async (id: string) => {
  const result = await prisma.flashSale.findUniqueOrThrow({
    where: {
      id,
    },
    include: { product: true },
  });

  return result;
};

const updateAFlashSale = async (id: string, payload: any) => {
  await prisma.flashSale.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updatedProduct = await prisma.flashSale.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedProduct;
};

export const FlashSaleServices = {
  createAFlashSale,
  getAllFlashSale,
  getAFlashSale,
  updateAFlashSale,
};
