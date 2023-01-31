import Logger from "../middleware/logger/logger.js";

export default function errorHandler(err, next) {
  if (err) {
    Logger.error(err);
    next(err);
  }
}
