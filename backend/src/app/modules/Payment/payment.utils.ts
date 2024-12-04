import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

type PaymentData = {
  transactionId: string;
  totalAmount: number;
  customerEmail: string;
  orderId: string;
};

export const initiatePayment = async (paymentData: PaymentData) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}&orderId=${paymentData.orderId}&status=success`,
      fail_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}&orderId=${paymentData.orderId}&status=failed`,
      cancel_url: `http://localhost:3000/orders`,
      amount: paymentData.totalAmount,
      currency: "BDT",
      desc: "Order Payment",
      cus_name: "N/A",
      cus_email: paymentData.customerEmail,
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: "N/A",
      type: "json",
      opt_a: paymentData.orderId,
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    const verificationResponse = response.data;
    verificationResponse.orderId = verificationResponse.opt_a;

    return verificationResponse;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
