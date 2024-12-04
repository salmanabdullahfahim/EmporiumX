import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";
import { Prisma } from "@prisma/client";
import { productSearchableFields } from "./product.constant";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { TProductFilterRequest } from "../../interfaces/common";
import { TPaginationOptions } from "../../interfaces/pagination";

// vendor services
const createProductIntoDB = async (req: Request) => {
  const files = req.files as IFile[];

  if (files) {
    const uploadedImages = await Promise.all(
      files.map((file: IFile) => fileUploader.uploadToCloudinary(file))
    );
    req.body.images = uploadedImages.map((upload) => upload?.secure_url);
  }

  const result = await prisma.product.create({
    data: req.body,
  });

  return result;
};

const updateProductIntoDB = async (id: string, req: Request) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.product.update({
    where: {
      id,
    },
    data: req.body,
  });

  return result;
};

const deleteProductFromDB = async (id: string) => {
  await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.product.delete({
    where: {
      id,
    },
  });

  return result;
};

// user and admin services
const getAllProductsFromDB = async (
  params: TProductFilterRequest,
  options: TPaginationOptions
) => {
  // create filter condition
  // get product data
  // get meta data
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.ProductWhereInput = { AND: andConditions };

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: "desc" },
  });

  const total = await prisma.product.count({
    where: whereConditions,
  });

  return {
    data: result,
    meta: { page, limit, total },
  };
};

const getProduct = async (id: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const duplicateAProduct = async (id: string) => {
  // find existing product
  // remove id, createdAt, updatedAt, deletedAt
  // add the data to db
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const {
    id: _,
    updatedAt: __,
    createdAt: ___,
    deletedAt: ____,
    ...duplicateData
  } = result;

  return await prisma.product.create({
    data: duplicateData,
  });
};
export const ProductServices = {
  createProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getAllProductsFromDB,
  getProduct,
  duplicateAProduct,
};
