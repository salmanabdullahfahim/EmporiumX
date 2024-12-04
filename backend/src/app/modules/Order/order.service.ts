import prisma from "../../../shared/prisma";
import { v4 as uuidv4 } from "uuid";
import { initiatePayment } from "../Payment/payment.utils";

type OrderWithItems = {
  customerId: string;
  vendorId: string;
  totalAmount: number;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  orderItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
};

const createOrder = async (user: any, data: OrderWithItems) => {
  // Create order first
  const order = await prisma.order.create({
    data: {
      customerId: data.customerId,
      vendorId: data.vendorId,
      totalAmount: data.totalAmount,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      phone: data.phone,
      orderItems: {
        create: data.orderItems,
      },
    },
    include: {
      orderItems: true,
    },
  });

  // Generate transaction ID
  const transactionId = "TRNX-" + uuidv4();

  // Initiate payment
  const paymentData = {
    transactionId,
    totalAmount: data.totalAmount,
    customerEmail: user.email,
    orderId: order.id,
  };
  const paymentResponse = await initiatePayment(paymentData);

  return paymentResponse;
};

export const OrderService = {
  createOrder,
};
