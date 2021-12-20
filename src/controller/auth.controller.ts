import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";

export const register = (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.confirm_password) {
    return res.status(400).send({
      message: "Password do not match",
    });
  }

  return res.send(body);
};
