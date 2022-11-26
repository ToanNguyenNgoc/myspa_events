const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../config/db");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.cookies["x-access-token"];

  if (!token) {
    return res.redirect("/login");
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
