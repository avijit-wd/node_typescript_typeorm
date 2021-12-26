import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Product } from "../entity/product.entity";

export const products = async (req: Request, res: Response) => {
  const take = 15;
  const page = parseInt((req.query.page as string) || "1");

  try {
    const repository = getManager().getRepository(Product);

    const [data, total] = await repository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    res.status(200).send({
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const repository = getManager().getRepository(Product);

    const product = await repository.save(req.body);

    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const repository = getManager().getRepository(Product);

    const product = await repository.findOne(id);

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const repository = getManager().getRepository(Product);

    await repository.update(id, req.body);

    const product = await repository.findOne(id);

    res.status(202).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const repository = getManager().getRepository(Product);

    await repository.delete(id);

    res.status(204).send(null);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
