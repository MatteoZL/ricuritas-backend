import { Request, Response } from "express";
import Payment from "../models/Payment";
import createPDF from "../libs/pdf-creator";

export const createPayment = async (data: any) => {
  if (data.method == "efectivo") return await Payment.create(data);
  data.apvl_num = Math.floor(Math.random() * 100);
  data.apvl_date = new Date();
  data.receipt = await createPDF(data);
  const payment = await Payment.create(data);
  return payment;
};

export const readPayment = async (id: string) => {
  const payments = await Payment.findAll({
    attributes: [
      "method",
      "card_num",
      "quotas",
      "apvl_num",
      "apvl_date",
      "entity",
    ],
    where: {
      order_id: id,
    },
  });
  return payments;
};
