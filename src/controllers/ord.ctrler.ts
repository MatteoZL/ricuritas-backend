import { Request, Response } from "express";
import Order from "../models/Order";
import { createPayment, readPayment } from "../controllers/pymt.ctrler";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    body.date_time = new Date();
    const order = await Order.create(body);
    body.order_id = await order.getDataValue("id");
    const payment = await createPayment(body);
    res.status(200).json({
      msg: "Orden creada exitosamente",
      order,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    const payments = await readPayment(id);
    !order
      ? res.status(404).json({ msg: "Orden no encontrada" })
      : res.status(200).json({ order, payments });
  } catch (error) {
    res.status(500).json({ msg: "Comunicarse con Matteo" });
  }
};

export const allOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    const fullOrders: Array<any> = [];
    for (let i = 0; i < orders.length; i++) {
      let order: any = orders[i];
      let payments: any = await readPayment(order.getDataValue("id"));
      fullOrders.push({ order, payments });
    }
    res.status(200).json({ fullOrders });
  } catch (error) {
    res.status(500).json({ msg: "Comunicarse con Matteo" });
  }
};

export const searchByRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({
      where: {
        restaurant_id: id,
      },
    });
    const fullOrders: Array<any> = [];
    for (let i = 0; i < orders.length; i++) {
      let order: any = orders[i];
      let payments: any = await readPayment(order.getDataValue("id"));
      fullOrders.push({ order, payments });
    }
    res.status(200).json({ fullOrders });
  } catch (error) {
    res.status(500).json({ msg: "Comunicarse con Matteo" });
  }
};
