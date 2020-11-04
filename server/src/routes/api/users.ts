import { Router, Request, Response } from "express";

// middlewares
import auth from "../../middlewares/auth";

// controllers
import {
  getUsers,
  getUserById,
  createUser,
} from "../../controllers/users";

const router = Router();

router.route("/")
  .get(auth, getUsers)
  .post(createUser);

router.route("/:id")
  .get(auth, getUserById);

export default router;