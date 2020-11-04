import { Router, Request, Response } from "express";

// middlewares
import auth from "../../middlewares/auth";

// controllers
import { 
  getBoards, 
  getBoardById, 
  createBoard,
} from "../../controllers/boards";

const router = Router();

router.route("/")
  .get(auth, getBoards)
  .post(auth, createBoard);

router.route("/:id")
  .get(auth, getBoardById);

export default router;