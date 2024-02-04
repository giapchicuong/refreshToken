require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = [
  "/",
  "/about",
  "/contact",
  "/login",
  "/logout",
  "/register",
];

const createJwt = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const checkUserJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookie = req.cookies;
  if (cookie && cookie.accessToken) {
    let token = cookie.accessToken;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Verify token fail",
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

module.exports = {
  createJwt,
  verifyToken,
  checkUserJwt,
};
