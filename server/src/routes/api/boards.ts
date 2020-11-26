import { Router, Request, Response } from "express";

// middlewares
import auth from "../../middlewares/auth";

// controllers
import { 
  getBoards, 
  getBoardById, 
  createBoard,
  updateBoardById,
  deleteBoardById,
} from "../../controllers/boards";

const router = Router();

router.route("/")
  .get(auth, getBoards)
  .post(auth, createBoard);

router.route("/:id")
  .get(auth, getBoardById)
  .put(auth, updateBoardById)
  .delete(auth, deleteBoardById);

export default router;