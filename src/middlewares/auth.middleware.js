import jwt from "jsonwebtoken";
import tokenblacklist from "../model/tokenblacklist.schema.js";

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is required",
    });
  }

  try {
    const isTokenBlackList = await tokenblacklist.findOne({ token });

    if (isTokenBlackList) {
      return res.status(401).json({
        msg: "Token is invalid",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
}

export default authUser;
