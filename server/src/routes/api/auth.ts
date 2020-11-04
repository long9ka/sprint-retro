import { Router, Request, Response } from "express";

// controllers
import auth from "../../controllers/auth";

const router = Router();

router.route("/")
  .post(auth);

export default router;