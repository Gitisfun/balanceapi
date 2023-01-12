import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import responseHandler from "./responseHandler.js";

class Authenticator {
  static hasher(body, query, paramList, responser, res, next) {
    bcrypt.hash(body.password, 10, function (err, hash) {
      if (err) {
        console.log(err);
        next(err);
      } else {
        paramList.unshift(hash);
        responser(query, paramList, res, next);
      }
    });
  }

  static comparer(user, foundUser, response, next) {
    const ONE_MONTH = 60 * 60 * 24 * 30;
    let msg = {};
    console.log("D");
    bcrypt.compare(user.password, foundUser.password, (err, result) => {
      if (err) {
        next(err);
      } else if (!result) {
        msg = {
          msg: "Invalid credentials, try again",
          status: false,
        };
      } else {
        const token = jwt.sign({ foundUser }, process.env.SECRET_KEY, {
          expiresIn: ONE_MONTH,
        });
        const temp = jwt.decode(token);
        msg = {
          msg: "Login succesful",
          status: true,
          id: foundUser.id,
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          token: token,
          iat: temp.iat,
          exp: temp.exp,
        };
      }
      responseHandler(err, msg, response, next);
    });
  }
}

export default Authenticator;
