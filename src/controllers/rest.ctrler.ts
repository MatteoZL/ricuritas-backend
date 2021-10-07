import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";
import {
  createLocation,
  readLocation,
  updateLocation,
} from "../controllers/loc.ctrler";
import { Op } from "sequelize";
import Sale from "../models/Sales";
import { Sequelize } from "sequelize";

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
  const { id } = req.params;
  try {
    if (id == "open") {
      let now: number = new Date().getHours();
      const restaurants: any = await Restaurant.findAll({
        where: {
          open_time: { [Op.lt]: now },
          close_time: { [Op.gte]: now },
        },
      });
      for (let restaurant of restaurants) {
        const location: any = await readLocation(
          restaurant?.getDataValue("location_id")
        );
        restaurant.dataValues.location = location;
      }
      res.status(200).json(restaurants);
    } else {
      const restaurant: any = await Restaurant.findByPk(id);
      const location: any = await readLocation(
        restaurant?.getDataValue("location_id")
      );
      !restaurant
        ? res.status(400).json({ msg: `Sede restaurante no encontrada` })
        : res
            .status(200)
            .json(Object.assign(restaurant.dataValues, location.dataValues));
    }
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

export const bestSelling = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let statistics = await Sale.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("total")), "total"],
        "restaurant_id",
      ],
      group: ["restaurant_id"],
      order: Sequelize.literal("total DESC"),
    });
    let totals = [];
    let restaurants = [];
    for (let statistic of statistics) {
      totals.push(statistic.getDataValue("total"));
      let product = await Restaurant.findByPk(
        statistic.getDataValue("restaurant_id")
      );
      restaurants.push(product?.getDataValue("site"));
    }
    res.json({ restaurants, totals });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const worstSelling = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    let statistics = await Sale.findAll({
      attributes: [
        [Sequelize.fn("sum", Sequelize.col("total")), "total"],
        "restaurant_id",
      ],
      group: ["restaurant_id"],
      order: Sequelize.literal("total ASC"),
    });
    let totals = [];
    let restaurants = [];
    for (let statistic of statistics) {
      totals.push(statistic.getDataValue("total"));
      let product = await Restaurant.findByPk(
        statistic.getDataValue("restaurant_id")
      );
      restaurants.push(product?.getDataValue("site"));
    }
    res.json({ restaurants, totals });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};