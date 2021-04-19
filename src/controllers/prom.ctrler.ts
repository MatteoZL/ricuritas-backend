import { Request, Response } from "express";
import Promotion from "../models/Promotion";

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, title, discount } = req.body;
    const promotion = await Promotion.create({
      start_date,
      end_date,
      title,
      discount,
    });
    res.status(200).json({
      msg: "Promocion creada con exito",
      promotion,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readPromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findByPk(id);
    !promotion
      ? res.status(400).json({ msg: `Promocion no encontrada` })
      : res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const promotion = await Promotion.findByPk(id);
    if (!promotion)
      return res.status(400).json({ msg: "Promocion no encontada" });
    await promotion.update(body);
    res.status(200).json({
      msg: "Promocion actualizada con exito",
      promotion,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Promotion.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ msg: "Borrado exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const allPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await Promotion.findAll({ order: ["end_date"] });
    res.json({ promotions });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};
