import { Request, Response } from "express";
import { SECRET } from "../config";
import { genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

// models
import User, { IUser } from "../models/User";
import Profile, { IProfile } from "../models/Profile";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    if (users) {
      res.status(200).json({
        msg: "ok",
        body: users,
      });
    } else {
      res.status(404).json({
        msg: "no users exist",
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate("profile_id");
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
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { username, password, email, name } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(400).json({
        msg: "duplicate username",
      });
      return;
    }
    // new user profile
    const newProfile = await new Profile({
      email : email,
      name  : name,
    }).save();

    // hash password
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    
    const newUser = await new User({
      username    : username,
      password    : hashPassword,
      profile_id  : newProfile.id,
    }).save();

    // create token
    const payload = {
      id: newUser.id
    }
    const token = sign(payload, SECRET, { expiresIn: 1800 });

    if (newUser) {
      res.status(201).json({
        msg: "created user",
        body: token,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      msg: err.message,
    });
  }
}