import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { JwtHandler } from "../utils/jwtHandler";

interface JwtUser {
  userId: string;
  name: string;
  email: string;
  role: string;
}

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.token;

  console.log("token", token);

  if (!token) {
    return next(
      new AppError(
        401,
        "You are not authorized"
      )
    );
  }

  try {

    const decoded =
      JwtHandler.verifyToken(token) as JwtUser;

    console.log("decoded", decoded);

    req.user = decoded;

    next();

  } catch {

    next(
      new AppError(
        401,
        "Invalid or expired token"
      )
    );

  }
};

export default auth;