import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies["jwt"];

    const payload: any = verify(jwt, process.env.SECRET_KEY);

    if (!payload) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const repository = getManager().getRepository(User);

    //Set user value in req
    req["user"] = await repository.findOne(payload.id);

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
};
