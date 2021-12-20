import { Request, Response } from "express";
import { getManager } from "typeorm";
import { RegisterValidation } from "../validation/register.validation";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
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

  const repository = getManager().getRepository(User);

  const { password, ...user } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  });

  return res.send(user);
};

export const login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);

  const user = await repository.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "Invalid credentials" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: "Invalid credentials!" });
  }

  const token = sign({ id: user.id }, process.env.SECRET_KEY);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  const { password, ...data } = user;
  res.send({ message: "success" });
};

export const authenticatedUser = async (req: Request, res: Response) => {
  const { password, ...user } = req["user"];
  res.send(user);
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });

  res.send({ message: "success" });
};

export const updateInfo = async (req: Request, res: Response) => {
  const user = req["user"];

  const repository = getManager().getRepository(User);

  await repository.update(user.id, req.body);

  const { password, ...data } = await repository.findOne(user.id);

  res.send(data);
};

export const updatePassword = async (req: Request, res: Response) => {
  const user = req["user"];
  if (req.body.password !== req.body.confirm_password) {
    return res.status(400).send({
      message: "Password do not match",
    });
  }

  const repository = getManager().getRepository(User);

  await repository.update(user.id, {
    password: await bcrypt.hash(req.body.password, 10),
  });

  const { password, ...data } = user;

  res.send(data);
};
