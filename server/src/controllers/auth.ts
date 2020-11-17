import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET } from "../config";

// models
import User, { IUser } from "../models/User";

export const checkauth = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user) {
      res.status(200).json({
        msg: "ok",
        body: user,
      });
    } else {
      res.status(404).json({
        msg: "user does not exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message, 
    });
  }
}

export const login =  async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).json({
        msg: "user does not exist",
      });
      return;
    }

    const isMatch = await compare(password, user.password);
    if (isMatch) {
      const payload = {
        id: user.id,
      };
      const token = sign(payload, SECRET, { expiresIn: 1800 });
      if (token) {
        res.status(200).json({
          msg: "ok",
          body: token,
        });
      }
    } else {
      res.status(400).json({
        msg: "invalid credentials",
      }); 
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}