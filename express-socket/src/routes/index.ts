import express from "express";
import { Request, Response, NextFunction } from "express";
import PingController from "../controllers/ping";

const router = express.Router();

router.get("/ping", function (req: Request, res: Response, next: NextFunction) {
  const controller = new PingController();
  const response = controller.getMessage();
  res.send(response);
});
export default router;
