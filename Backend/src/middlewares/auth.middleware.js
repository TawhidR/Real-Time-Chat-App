import User from "../models/user.models.js";
import jwt from 'jsonwebtoken';
export const protectRoute = async(req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findById(decoded.UserId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = User;
    next();
  } catch (error) {
    console.error("Auth Error: ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};