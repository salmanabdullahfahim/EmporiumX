import prisma from "../../../shared/prisma";

const createCategoryIntoDB = async (payload: {
  name: string;
  description?: string;
}) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const updateCategoryIntoDB = async (id: string, payload: any) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
