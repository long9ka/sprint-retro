import { Router, Request, Response } from "express";

// middlwares
import auth from "../../middlewares/auth";

// controllers
import { login, checkauth } from "../../controllers/auth";

const router = Router();

router.route("/")
  .get(auth, checkauth)
  .post(login);

export default router;