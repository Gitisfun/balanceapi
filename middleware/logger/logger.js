import chalk from "chalk";
import { tableStates } from "./tableStates.js";

class Logger {
  static generic(type, color, txt) {
    if (process.env.CO_MODE === "DEV") {
      console.log(color(`[${type}] ${txt}`));
    }
  }

  static success(txt) {
    this.generic("Succes", chalk.green, txt);
  }

  static info(txt) {
    this.generic("Info", chalk.blue, txt);
  }

  static query(table, txt) {
    this.generic(table, tableStates(table), txt);
  }

  static error(txt) {
    this.generic("Error", chalk.red, txt);
  }
}

export default Logger;
