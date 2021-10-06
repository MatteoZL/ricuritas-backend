import { Request, Response } from "express";
import Order from "../models/Order";
import { createPayment, readPayment } from "../controllers/pymt.ctrler";
import Inventory from "../models/Inventory";
import Restaurant from "../models/Restaurant";
import Sale from "../models/Sales";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    for (let product of body.products_list) {
      let inventory = await Inventory.findOne({
        where: {
          product_id: product.id,
          restaurant_id: body.restaurant_id,
        },
      });
      let units: number = inventory?.getDataValue("units") - product.quantity;
      if (units < 0) {
        res.status(400).json({
          msg: `No hay suficiente ${product.name}. Inténtalo más tarde`,
        });
      } else {
        body.date_time = new Date();
        const order = await Order.create(body);
        body.order_id = order.getDataValue("id");
        const restaurant = await Restaurant.findByPk(body.restaurant_id)
        body.restaurant_name = restaurant?.getDataValue("site");
        const payment = await createPayment(body);
        Inventory.increment("units", {
          by: -1 * product.quantity,
          where: { product_id: product.id, restaurant_id: body.restaurant_id },
        });
        let sale = {
          product_id: product.id,
          quantity: product.quantity,
          total: product.amount,
          restaurant_id: body.restaurant_id,
          date_time: body.date_time
        }
        await Sale.create(sale);
        res.status(200).json({
          msg: "Orden creada exitosamente",
          order,
          payment,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
    console.log(error);
    
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

export const searchByClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({
      where: {
        user_id: id,
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
