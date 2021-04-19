import { Request, Response } from "express";
import User from "../models/User";
import {
  createLocation,
  readLocation,
  updateLocation,
  deleteLocation,
} from "./loc.ctrler";
import { encryptPassword } from "../libs/bcrypt";

export const createUser = async (data: any) => {
  try {
    // Saving new Location
    const location = await createLocation(data);
    // Adding the id location for the new User
    data.location_id = location.getDataValue("id");
    // Encrypt Password
    let passToEncrypt: string = data.password;
    data.password = await encryptPassword(passToEncrypt);
    // Saving new User
    const user = await User.create(data);
    return user;
  } catch (error) {
    // Delete the previously created location
    await deleteLocation(data.location_id);
    // Error handling
    switch (error.parent.constraint) {
      case "user_pkey":
        throw { custMsg: "Ya exste un usuario con ese número de documento" };
      case "user_phone_num_key":
        throw { custMsg: "Ya exste un usuario con ese número de telefónico" };
      case "user_email_key":
        throw { custMsg: "Ya exste un usuario con ese correo electrónico" };
      default:
        return error;
    }
  }
  // custMsg: Custom Message, mensaje personalizado
};

export const readUser = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    const user: any = await User.findByPk(id);
    const location: any = await readLocation(user?.getDataValue("location_id"));
    !user
      ? res.status(404).json({ msg: `Usuario no encontrado con el id ${id}` })
      : res
          .status(200)
          .json(Object.assign(user.dataValues, location.dataValues));
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    const { body } = req;
    const user: any = await User.findByPk(id);
    if (!user)
      return res
        .status(404)
        .json({ msg: `Usuario no encontrado con el id ${id}` });
    // Update Location
    const newLoc: any = await updateLocation(user.location_id, body);
    // Encrypt Password
    let passToEncrypt: string = body.password;
    body.password = await encryptPassword(passToEncrypt);
    await user.update(body);
    res.status(200).json({
      msg: "Usuario actualizado con éxito",
      user: Object.assign(user.dataValues, newLoc.dataValues),
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.userId;
    // Logical deletion
    await User.update({ available: false }, { where: { doc_num: id } });
    res.status(200).json({ msg: "Borrado exitoso" });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const searchByEmail = async (email: string) => {
  const user = await User.findOne({
    where: {
      email,
      available: true,
    },
  });
  if (user) {
    return user;
  }
  return null;
};
