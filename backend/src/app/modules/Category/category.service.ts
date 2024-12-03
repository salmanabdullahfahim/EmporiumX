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

export const CategoryServices = {
  createCategoryIntoDB,
};
