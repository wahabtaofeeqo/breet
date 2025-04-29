import dotenv from "dotenv";
import Joi from "joi";
import { Config } from "../src/common/interfaces/config.interface";

dotenv.config();

const envSchema: any = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development")
      .required(),
    PORT: Joi.number().default(7000),
    JWT_SECRET_KEY: Joi.string()
      .required()
      .description("Secret Key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.string()
      .required()
      .description("JWT Access expiration in minutes"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.string()
      .required()
      .description("JWT Refresh expiration in days"),
    MONGODB_URL: Joi.string()
      .required()
      .description("Mongo Url"),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET_KEY,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
  },
  database: {
    url: envVars.MONGODB_URL,
    options: {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  }
};