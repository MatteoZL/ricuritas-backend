import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import {
  createLocation,
  readLocation,
  updateLocation,
} from "../controllers/loc.ctrler";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    // Saving new Location
    const location = await createLocation(body);
    // Adding the new Location
    body.location_id = location.getDataValue("id");
    // Saving new Restaurant
    const restaurant = await Restaurant.create(body);
    res.status(200).json({
      msg: "Sede restaurante creada con exito",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const readRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant: any = await Restaurant.findByPk(id);
    const location: any = await readLocation(
      restaurant?.getDataValue("location_id")
    );
    !restaurant
      ? res.status(400).json({ msg: `Sede restaurante no encontrada` })
      : res
          .status(200)
          .json(Object.assign(restaurant.dataValues, location.dataValues));
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const restaurant: any = await Restaurant.findByPk(id);
    if (!restaurant)
      return res.status(400).json({ msg: "Sede restaurante no encontada" });
    // Update Location
    const newLoc: any = await updateLocation(
      restaurant.getDataValue("location_id"),
      body
    );
    await restaurant.update(body);
    res.status(200).json({
      msg: "Sede Restaurante actualizada con exito",
      restaurant: Object.assign(restaurant.dataValues, newLoc.dataValues),
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Logical deletion
    await Restaurant.update({ available: false }, { where: { id } });
    res.status(200).json({ msg: "Borrado exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const allRestaurants = async (req: Request, res: Response) => {
  try {
    const restData = await Restaurant.findAll({ order: ["site"] });
    const restaurants: Array<any> = [];
    for (let i = 0; i < restData.length; i++) {
      const restaurant: any = restData[i];
      const location: any = await readLocation(
        restaurant.getDataValue("location_id")
      );
      restaurants.push(
        Object.assign(restaurant.dataValues, location.dataValues)
      );
    }
    res.status(200).json({ restaurants });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};
