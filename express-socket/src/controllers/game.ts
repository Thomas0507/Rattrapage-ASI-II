import { Get, Route } from "tsoa";
import {v4 as uuidv4} from 'uuid';
import GameSessionService from '../services/GameSessionService';

interface SessionResponse {
    uuid: string;
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
}
