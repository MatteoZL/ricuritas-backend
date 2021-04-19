import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  id: number;
  role: number;
  iat: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.header("Authorization");
  if (!token) res.status(401).json({ msg: "Access denied " });
  const payload = jwt.verify(
    token,
    process.env.TOKEN_SECRET || "token_test"
  ) as IPayload;
  req.userId = payload.id;
  req.userRole = payload.role;
  next();
};

export const AdminValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | any = req.header("Authorization");
  if (!token) res.status(401).json({ msg: "Access denied " });
  const payload = jwt.verify(
    token,
    process.env.TOKEN_SECRET || "token_test"
  ) as IPayload;
  if (payload.role != 1) res.status(401).json({ msg: "Access denied " });
  req.userId = payload.id;
  next();
};
