import { Request, Response } from "express";

export const upload = () => async (req: Request, res: Response) => {
  res.send({ message: "upload success!" });
};
