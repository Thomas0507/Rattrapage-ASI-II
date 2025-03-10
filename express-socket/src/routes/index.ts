import express from "express";
import { Request, Response, NextFunction } from "express";
import PingController from "../controllers/ping";
import GameController from "../controllers/game";
import { Namespace } from "socket.io";
import { globalUsers } from "../socket/socket";

//define routes 
const router = express.Router();
interface ErrorResponse {

}

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

router.get("/game/join-session/:id", async function (req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  const controller = new GameController();
  const response = await controller.joinSession(id);
  if (response.errorResponse) {
    // error
    res.statusCode = response.errorResponse.status;
    res.send(response.errorResponse);
  } else {
    res.statusCode = 200;
    res.send(response);
  }
});

let notifNamespace: Namespace | null = null;

export const setNotifNamespace = (namespace: Namespace) => {
  notifNamespace = namespace;
};

router.post('/send-notification', function (req: Request, res: Response, next: NextFunction) {
  const { status, username, message } = req.body;
  

  if (!notifNamespace) {
    res.status(500).send({ message: 'Namespace Socket.IO non initialisé' });
  }

  const socket = globalUsers.get(username);

  const targetSocket = notifNamespace.sockets.get(socket.socketId);
  if (!targetSocket) {
    res.status(404).send({ message: 'Client non trouvé' });
  }

  targetSocket.emit('notification', { status, message });

  console.log('Notification envoyée:', { status, message });
  res.status(200).send({ message: 'Notification envoyée avec succès' });
});

export default router;
