import mongoose from 'mongoose';
import { ProductModel } from '../../src/modules/product/product.model';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import logger from '../../config/logger';
import chalk from 'chalk';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    await ProductModel.deleteMany({});

    const products: any[] = [];
    for (let i = 0; i < 50; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 1000 })),
        stockQuantity: faker.number.int({ min: 0, max: 500 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      });
    }

    // Insert products
    await ProductModel.insertMany(products);
    logger.info('Products seeded successfully');

    process.exit(0);
  } 
  catch (error) {
    logger.error(chalk.bgRed(chalk.whiteBright("Error while seeding DB:")), error);
    mongoose.disconnect().finally(() => process.exit(1));
  }
};

seedProducts();
