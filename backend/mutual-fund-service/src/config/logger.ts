import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

export const logger = winston.createLogger({
  level: "info",

  format: logFormat,

  transports: [
    new winston.transports.Console(),

    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",

      datePattern: "YYYY-MM-DD",

      maxFiles: "14d",
    }),
  ],
});