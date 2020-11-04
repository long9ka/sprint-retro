import { Router, Request, Response } from "express";

// middlewares
import auth from "../../middlewares/auth";

// controllers
import { 
  getItems,
  createItem,
} from "../../controllers/items";

const router = Router();

router.route("/:id")
  .get(auth, getItems)
  .post(auth, createItem);

export default router;