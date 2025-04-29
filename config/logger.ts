import winston, { Logger as WinstonLogger } from "winston";
import { envs } from "./env";

export class Logger {
  private static enumerateErrorFormat: any = winston.format((info): any => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });

  public logger: WinstonLogger = winston.createLogger({
    level: envs.env === "development" ? "debug" : "info",
    format: winston.format.combine(
      Logger.enumerateErrorFormat(),
      envs.env === "development"
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(
        ({ level, message }): string => `${level}: ${message}`
      )
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ["error"]
      })
    ]
  });
}

export default new Logger().logger;