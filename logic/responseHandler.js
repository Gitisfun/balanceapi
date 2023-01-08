import Logger from "../middleware/logger/logger.js";

export default function responseHandler(err, results, res, next) {
  if (err) {
    Logger.error(err);
    next(err);
  } else {
    res.send(results);
  }
}
