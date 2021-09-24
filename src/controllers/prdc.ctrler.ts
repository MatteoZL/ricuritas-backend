import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import Promotion from "../models/Promotion";
import { deleteImage, uploadImage } from "../libs/cloudinary";
import Product from "../models/Product";
import Category from "../models/Category";
import Inventory from "../models/Inventory";
import Restaurant from "../models/Restaurant";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { body, files } = req;
    // Upload iamge to Cloudinary
    const image = files!.image as UploadedFile;
    body.image = await uploadImage(image.tempFilePath);
    // Saving new Product
    const product = await Product.create(body);
    // Saving units in the inventory
    const restaurants = await Restaurant.findAll();
    for (let restaurant of restaurants) {
      await Inventory.create({
        product_id: product.getDataValue("id"),
        restaurant_id: restaurant.getDataValue("id"),
        units: body.units,
      });
    }
    res.status(200).json({
      msg: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Searching the product
    const product = await Product.findByPk(id);
    if (!product) res.status(404).json({ msg: `Producto no encontrado` });
    // Looking for a promotion
    const promotion = await checkPromos(product?.getDataValue("promotion"));
    product?.setDataValue("promotion", promotion);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readProductByRestaurant = async (req: Request, res: Response) => {
  try {
    const { id_restaurant, id_product } = req.params;
    // Searching the product
    const product: any = await Product.findByPk(id_product);
    if (!product) res.status(404).json({ msg: `Producto no encontrado` });
    // Looking for a promotion
    const promotion = await checkPromos(product?.getDataValue("promotion"));
    product?.setDataValue("promotion", promotion);
    // Adds the units that there are
    let inventory = await Inventory.findOne({
      where: { product_id: id_product, restaurant_id: id_restaurant },
    });
    product.dataValues.units = inventory?.getDataValue("units");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body, files } = req;
    if (body.promotion == "") body.promotion = null;
    if (files) {
      // Upload iamge to Cloudinary
      const image = files!.image as UploadedFile;
      body.image = await uploadImage(image.tempFilePath);
    }
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ msg: `Producto no encontrado` });
    await product.update(body);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.update(
      {
        available: false,
      },
      { where: { id } }
    );
    //await deleteImage();
    res.status(200).json({ msg: "Borrado exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const allProducts = async (req: Request, res: Response) => {
  try {
    const products: any = await Product.findAll({ order: ["name"] });
    for (let product of products) {
      let category = await Category.findByPk(
        product.getDataValue("category_id")
      );
      product.dataValues.category_name = category?.getDataValue("name");
      let promotion = await checkPromos(product.getDataValue("promotion"));
      product.setDataValue("promotion", promotion);
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const searchByCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findAll({
      where: {
        category_id: id,
      },
      order: ["name"],
    });
    for (let product of products) {
      let promotion = await checkPromos(product.getDataValue("promotion"));
      product.setDataValue("promotion", promotion);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const searchByRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products: any = await Product.findAll({ order: ["name"] });
    for (let product of products) {
      let promotion = await checkPromos(product.getDataValue("promotion"));
      product.setDataValue("promotion", promotion);
      let inventory = await Inventory.findOne({
        where: { product_id: product.getDataValue("id"), restaurant_id: id },
      });
      product.dataValues.units = inventory?.getDataValue("units");
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

const checkPromos = async (id: number): Promise<any> => {
  if (id == null) return null;
  let promotion = await Promotion.findByPk(id),
    today = new Date(),
    start_date = new Date(promotion?.getDataValue("start_date")),
    end_date = new Date(promotion?.getDataValue("end_date"));
  if (
    today.getTime() < start_date.getTime() ||
    today.getTime() > end_date.getTime()
  )
    return null;

  return promotion;
};
