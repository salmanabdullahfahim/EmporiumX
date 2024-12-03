import { Admin, UserRole } from "@prisma/client";
import { Request } from "express";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";

const createAdminIntoDB = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    name: req.body.admin.name,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};
const createVendorIntoDB = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.vendor.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.vendor.email,
    name: req.body.vendor.name,
    password: hashedPassword,
    role: UserRole.VENDOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdVendorData = await transactionClient.vendor.create({
      data: req.body.vendor,
    });

    return createdVendorData;
  });

  return result;
};
const createCustomerIntoDB = async (req: Request): Promise<Admin> => {
  const file = req.file as IFile;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);

    req.body.customer.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.customer.email,
    name: req.body.customer.name,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdCustomerData = await transactionClient.customer.create({
      data: req.body.customer,
    });

    return createdCustomerData;
  });

  return result;
};

const deleteUserFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

const suspendUserFromDB = async (id: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isSuspended: true,
    },
  });

  return result;
};

export const UserServices = {
  createAdminIntoDB,
  createVendorIntoDB,
  createCustomerIntoDB,
  deleteUserFromDB,
  suspendUserFromDB,
};
