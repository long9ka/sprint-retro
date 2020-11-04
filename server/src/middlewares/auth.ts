import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../config";

export default (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization") || req.header("x-auth-token");
  
  try {
    if (!token) {
      res.status(401).json({
        msg: "authorization denied",
      });
      return;
    } 
    const decoded = verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}