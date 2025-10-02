import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit"
import User from "../models/user.model.js";
const auth =  (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

export const ratelimiter = rateLimit({
  windowMs:10*60*1000,
  message:"Too many requests",
  max:10,
  standardHeaders: true, 
  legacyHeaders: false,
})


export const authorzationMiddleware = (...roles) => {
  return async (req, res, next) => {
    if (req.user) {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if (!roles.includes(user.role)) {
        return res.status(403).json({ msg: "Restricted route" });
      }
      next();
    } else {
      return res.status(403).json({ msg: "User not logged in" });
    }
  };
};
export default auth;
