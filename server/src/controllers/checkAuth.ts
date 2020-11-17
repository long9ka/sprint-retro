import { Request, Response } from "express";

// models
import User from "../models/User";

export default async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      msg: "ok",
      body: user,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
}