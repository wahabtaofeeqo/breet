import http = require("http");
import app from "./app";
import { envs } from "../config/env";
import { mongoose } from "@typegoose/typegoose";
import 'dotenv/config'
import logger from "../config/logger";
import chalk from "chalk";

const APP_PORT = envs.port;

/**
 * Setup Mongo connection
 */
mongoose
  .connect(envs.database.url, envs.database.options)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => logger.error(`Error in mongoose connection ${err}`));

/**
 * Setup server
 */
const server = http.createServer(app);
server.listen(APP_PORT);

server.on("listening", (): void => {
  logger.info(
    chalk.bgGreen(chalk.black(`API has been started in port ${APP_PORT}!`))
  );
});

server.on("error", (error: NodeJS.ErrnoException): void => {
  logger.error(chalk.bgRed(chalk.whiteBright(error.message)));
});