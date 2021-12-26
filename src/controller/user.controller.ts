import { Request, Response } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from "bcryptjs";
import { log } from "../utils/logger";

export const users = async (req: Request, res: Response) => {
  log.info(`Incoming request for getting users`);

  const take = 15;
  const page = parseInt((req.query.page as string) || "1");

  try {
    const repository = getManager().getRepository(User);

    const [data, total] = await repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: ["role"],
    });

    res.status(200).send({
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
    log.error(`Error found in gettings users function`);
  }
};

export const createUser = async (req: Request, res: Response) => {
  log.info(`Incoming request for creating a user`);

  const { role_id, ...body } = req.body;

  try {
    const repository = getManager().getRepository(User);

    const hashedPassword = await bcrypt.hash("1234", 10);

    const { password, ...user } = await repository.save({
      ...body,
      password: hashedPassword,
      role: {
        id: role_id,
      },
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
    log.error(`Error found in creating a user`);
  }
};

export const getUser = async (req: Request, res: Response) => {
  log.info(`Incoming request for getting a single user`);

  const { id } = req.params;

  try {
    const repository = getManager().getRepository(User);

    const { password, ...user } = await repository.findOne(id, {
      relations: ["role"],
    });

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
    log.error(`Error found in getting a single user`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  log.info(`Incoming request for updating a user`);

  const { id } = req.params;

  const { role_id, ...body } = req.body;

  try {
    const repository = getManager().getRepository(User);

    await repository.update(id, {
      ...body,
      role: {
        id: role_id,
      },
    });

    const { password, ...user } = await repository.findOne(id, {
      relations: ["role"],
    });

    res.status(202).send(user);
  } catch (error) {
    res.status(500).send(error.message);
    log.error(`Error found in updating a single user`);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  log.info(`Incoming request for deleting a user`);

  const { id } = req.params;

  try {
    const repository = getManager().getRepository(User);

    await repository.delete(id);

    res.status(204).send(null);
  } catch (error) {
    res.status(500).send(error.message);
    log.error(`Error found in deleting a user`);
  }
};
