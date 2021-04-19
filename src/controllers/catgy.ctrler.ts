import { Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(200).json({
      msg: "Categoria creada con exito",
      category,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: {
        id,
      },
    });
    !category
      ? res.status(400).json({ msg: `Categoria no encontrada` })
      : res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const category = await Category.findByPk(id);
    if (!category)
      return res.status(400).json({ msg: "Categoria no encontada" });
    await category.update(body);
    res.status(200).json({
      msg: "Cateogoria actualizada con exito",
      category,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activeProducts = await Product.findAll({
      where: { category_id: id, available: true },
    });
    if (activeProducts.length > 0)
      res
        .status(400)
        .json({
          msg: "No puedes borrar categorías que tengan productos activos",
        });
    await Product.update({ category_id: null }, { where: { category_id: id } });
    await Category.destroy({
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

export const allCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({ order: ["name"] });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};
