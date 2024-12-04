import { join } from "path";
import { readFileSync } from "fs";
import { verifyPayment } from "./payment.utils";
import prisma from "../../../shared/prisma";
import { OrderStatus } from "@prisma/client";

const confirmationService = async (transactionId: string, orderId: string) => {
  try {
    const verifyResponse = await verifyPayment(transactionId);
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      // Find the order associated with this transaction
      const payment = await prisma.$transaction(async (tx) => {
        // Create payment record
        const payment = await tx.payment.create({
          data: {
            transactionId,
            amount: parseFloat(verifyResponse.amount),
            orderId,
          },
        });

        // Update order status
        await tx.order.update({
          where: { id: orderId },
          data: { status: OrderStatus.COMPLETED },
        });

        // Update product inventory
        const orderItems = await tx.orderItem.findMany({
          where: { orderId: orderId },
        });

        for (const item of orderItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              inventory: {
                decrement: item.quantity,
              },
            },
          });
        }

        return payment;
      });

      message = "Payment successful! Your order has been confirmed.";
    } else {
      // Update order status to CANCELLED if payment failed
      await prisma.order.update({
        where: { id: verifyResponse.request_id },
        data: { status: OrderStatus.CANCELLED },
      });

      message = "Payment Failed! Your order has been cancelled.";
    }

    const filePath = join(__dirname, "../../../../public/confirmation.html");
    let template = readFileSync(filePath, "utf-8");
    template = template.replace("{{message}}", message);

    return template;
  } catch (error) {
    console.error("Error in confirmationService:", error);
    return "An error occurred during payment confirmation";
  }
};

const getPaymentHistory = async () => {
  return prisma.payment.findMany({
    include: {
      order: {
        include: {
          customer: true,
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
};

export const paymentServices = {
  confirmationService,
  getPaymentHistory,
};
