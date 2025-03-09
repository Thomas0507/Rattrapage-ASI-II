import { Get, Route } from "tsoa";
import {v4 as uuidv4} from 'uuid';
import GameSessionService from '../services/GameSessionService';
import { GameSession } from "../models/GameSession";

interface ErrorResponse {
  status: number;
  message: string;
  reason: string
}

interface SessionResponse {
    uuid: string;
}

interface GameSessionDto {
    sessionId: string,
    roomName: string,
    capacity: number,
    currentNbPlayers: number,
    status: string,
    players: any[],
}


@Route("game")
export default class GameController {
  @Get("/session")
  public getSessionId(): SessionResponse {
    let sessionId = uuidv4();
    const gameSession = GameSessionService.createGameSession(sessionId).then(
        res => console.log(res)
    );
    return {
      uuid: sessionId,
    };
  }
  @Get("/joinSession/:id")
  public async joinSession(id: string): Promise<GameSessionDto | ErrorResponse> {
    let response: GameSessionDto | ErrorResponse;
    await GameSessionService.getRoomById(id).then((res) => {
      if (res === null) {
        // Not Found
        response =
        {
          status: 404,
          message: "Could not find game session",
          reason: "Game session was not found in database. Maybe it has expired"
        } as ErrorResponse
        // Don't forget to return as we're inside an anonymous nested function
        return;
      }
      // If other test must be done, insert it there (e.g, session is inactive)
      const resAsObject = res.toJSON();
      response = {
          sessionId: resAsObject.sessionId,
          roomName: resAsObject.roomName,
          capacity: resAsObject.capacity,
          currentNbPlayers: resAsObject.currentNbPlayers,
          status: resAsObject.status,
          players: resAsObject.players,
        };
    }).catch(err => {
      // Error Mongo
      response =
      {
        status: 500,
        message: "Internal server error",
        reason: err.message
      } as ErrorResponse
    });
    return response
  }
}
