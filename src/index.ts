import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import morgan from "morgan";
import { createConnection } from "typeorm";

createConnection().then((connection) => {
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
    })
  );

  routes(app);

  app.listen(8000, () => console.log("Port running on port 8000"));
});
