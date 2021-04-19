import { Request, Response } from "express";
import { createUser, searchByEmail } from "./user.ctrler";
import jwt from "jsonwebtoken";
import { validatePassword } from "../libs/bcrypt";

export const signup = async (req: Request, res: Response) => {
  try {
    // Saving new User
    const { body } = req;
    const savedUser = await createUser(body);
    // Token
    const token: string = jwt.sign(
      { id: savedUser.doc_num, role: savedUser.role },
      process.env.TOKEN_SECRET || "token-test"
    );
    res.header("Authorization", token).json(savedUser);
  } catch (error) {
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
    res.header("Authorization", token).json(user);
  } catch (error) {
    res.status(500).json({
      msg: "Comunicarse con Matteo",
      error,
    });
  }
};
