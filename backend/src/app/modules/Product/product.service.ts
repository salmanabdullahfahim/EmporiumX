import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";

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
export const ProductServices = {
  createProductIntoDB,
  updateProductIntoDB,
};
