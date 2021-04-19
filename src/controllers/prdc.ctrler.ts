import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import Promotion from "../models/Promotion";
import { deleteImage, uploadImage } from "../libs/cloudinary";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { body, files } = req;
    // Upload iamge to Cloudinary
    const image = files!.image as UploadedFile;
    body.image = await uploadImage(image.tempFilePath);
    // Saving new Product
    const product = await Product.create(body);
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
    const products = await Product.findAll({ order: ["name"] });
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
