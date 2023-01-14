import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.headers["authorization"]) {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    if (token == null) return res.status(401).send({ msg: "No access allowed" });

    // TODO: Add proper secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).send({ msg: "You don't have access to this route" });
      } else {
        req.userId = user.foundUser.id;
        next();
      }
    });
  } else {
    return res.status(403).send({ msg: "You don't have access to this route" });
  }
}
