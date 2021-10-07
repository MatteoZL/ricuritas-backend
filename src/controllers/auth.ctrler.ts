import { Request, Response } from "express";
import { createUser, searchByEmail } from "./user.ctrler";
import jwt from "jsonwebtoken";
import { validatePassword } from "../libs/bcrypt";
import { readLocation } from "./loc.ctrler";

export const signup = async (req: Request, res: Response) => {
  try {
    // Saving new User
    const { body } = req;
    let dateNow = new Date();
    if (body.birth > dateNow)
      res
        .status(400)
        .json({
          msg: "La fecha de nacimiento no puede ser posterior a la fecha actual",
        });
    const user = await createUser(body);
    // Token
    const token: string = jwt.sign(
      { id: user.doc_num, role: user.role },
      process.env.TOKEN_SECRET || "token-test"
    );
    res.status(200).json({ Authorization: token, user });
  } catch (error: any) {
    // Custom error
    if (error.custMsg) return res.status(400).json({ msg: error.custMsg });
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    // Search User
    const { email, password } = req.body;
    const user: any = await searchByEmail(email);
    if (!user) return res.status(404).json({ msg: "Correo incorreto" });
    // Compare password
    const correctPassword: boolean = await validatePassword(
      password,
      user.password
    );
    if (!correctPassword)
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    // Token
    const token: string = jwt.sign(
      { id: user.doc_num, role: user.role },
      process.env.TOKEN_SECRET || "token-test"
    );
    const location: any = await readLocation(user?.getDataValue("location_id"));
    user.dataValues.location = location;
    res.status(200).json({ Authorization: token, user });
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};
