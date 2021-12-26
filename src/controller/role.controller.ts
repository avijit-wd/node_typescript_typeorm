import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity/role.entity";

export const roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);

  res.status(200).send(await repository.find());
};

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    name,
    permissions: permissions.map((id) => ({
      id,
    })),
  });

  res.status(201).send(role);
};

export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  const repository = getManager().getRepository(Role);

  res
    .status(200)
    .send(await repository.findOne(id, { relations: ["permissions"] }));
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, permissions } = req.body;

  const repository = getManager().getRepository(Role);

  const role = await repository.save({
    id: parseInt(id),
    name,
    permissions: permissions.map((id) => ({
      id,
    })),
  });

  res.status(202).send(role);
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  const repository = getManager().getRepository(Role);

  await repository.delete(id);

  res.status(204).send(null);
};
