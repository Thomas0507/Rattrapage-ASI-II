import express from "express";
import { Request, Response, NextFunction } from "express";
import PingController from "../controllers/ping";
import GameController from "../controllers/game";

//define routes 
const router = express.Router();

router.get("/ping", function (req: Request, res: Response, next: NextFunction) {
  const controller = new PingController();
  const response = controller.getMessage();
  res.send(response);
});

router.get("/game/session", function (req: Request, res: Response, next: NextFunction) {
  const controller = new GameController();
  const response = controller.getSessionId();
  res.send(response);
});

export default router;
