import { Request, Response } from "express";
import Location from "../models/Location";

export const createLocation = async (data: any) => {
  const { latitude, longitude, address } = data;
  const location = await Location.create({ latitude, longitude, address });
  return location;
};

export const readLocation = async (id: number) => {
  const location = await Location.findOne({
    attributes: ["latitude", "longitude", "address"],
    where: {
      id,
    },
  });
  return location;
};

export const updateLocation = async (id: number, data: any) => {
  try {
    const location = await Location.findByPk(id);
    if (!location) throw { custMsg: "Location not found" };
    await location.update(data);
    return location;
  } catch (error) {
    return error;
  }
};

export const deleteLocation = async (id: number) => {
  await Location.destroy({
    where: {
      id,
    },
  });
};

// Work but is not used in the application.
/*export const allLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.findAll();
    res.json({ locations });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};*/
