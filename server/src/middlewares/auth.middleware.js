import jwt from "jsonwebtoken";
import { BlacklistTokenModel } from "../models/blacklist.model.js";

export async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token not provided" });

  const isTokenBlacklisted = await BlacklistTokenModel.findOne({ token });
  if (isTokenBlacklisted)
    return res.status(401).json({ message: "Token is invalid" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error: ", error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}
