import { createConnection, getManager } from "typeorm";
import { Product } from "../entity/product.entity";
import faker from "faker";
import { randomInt } from "crypto";

createConnection().then(async (connection) => {
  const repository = await getManager().getRepository(Product);

  for (let i = 0; i < 30; i++) {
    await repository.save({
      title: faker.lorem.words(2),
      description: faker.lorem.words(10),
      image: faker.image.imageUrl(),
      price: randomInt(10, 100),
    });
  }
  process.exit(0);
});
