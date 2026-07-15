import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { JwtHandler } from "../utils/jwtHandler";

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError(401, "You are not authorized"));
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return next(new AppError(401, "Invalid token"));
  }

  try {
    const decoded = JwtHandler.verifyToken(token) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
};

export default auth;