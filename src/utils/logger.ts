import { createLogger, format, transports } from "winston";
import moment from "moment";

const { combine, timestamp, splat, printf } = format;
const logFormat = printf(({ timestamp, level, message, meta }) => {
  return `${moment(timestamp).format(
    "DD/MM/YYYY h:mm:ss"
  )}--${level} : ${message}`;
});

export const log = createLogger({
  level: "debug",
  format: combine(timestamp(), splat(), logFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: "logs/combined.log" }),
  ],
});
