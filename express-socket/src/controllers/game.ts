import { Get, Route, Post, Body } from "tsoa";
import {v4 as uuidv4} from 'uuid';
import GameSessionService from '../services/GameSessionService';
import { GameSession } from "../models/GameSession";

export interface JoinSessionResponse {
  errorResponse: ErrorResponse;
  gameSessionDto: GameSessionDto;
}

export interface ErrorResponse {
  status: number;
  message: string;
  reason: string
}

interface SessionResponse {
    uuid: string;
}

export interface GameSessionDto {
    sessionId: string,
    roomName: string,
    capacity: number,
    currentNbPlayers: number,
    status: string,
    players: any[],
}

export type CreateSessionRequest = {
  roomName: string;
  roomDescription: string;
  capacity: number;
  autoJoin: boolean;
}

export interface CreateSessionResponse {
  uuid: string;
  errorResponse: ErrorResponse;
}

@Route("game")
export default class GameController {
  // depreciated
  @Get("/session")
  public getSessionId(): SessionResponse {
    let sessionId = uuidv4();
    const gameSession = GameSessionService.createGameSession(sessionId).then(
        // res => console.log(res)
    );
    return {
      uuid: sessionId,
    };
  }

  @Get("/all")
  public async getAllSession(): Promise<any> {
    const gameSession: any[] = await GameSessionService.getAllSessions()
    if (gameSession) {
      return {
        gameSessionArray: gameSession,
        errorResponse: null
      }
    } else {
      return {
        gameSessionArray: null,
        errorResponse :{
          status: 500,
          message: "Error with database",
          reason: "No more info given"
        }
      }
    }

  }
  @Get("/joinSession/:id")
  public async joinSession(id: string): Promise<JoinSessionResponse> {
    let response: JoinSessionResponse = {
      gameSessionDto: null,
      errorResponse: null
    }
    await GameSessionService.getRoomById(id).then((res) => {
      if (res === null) {
        // Not Found
        response.errorResponse =
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
      response.gameSessionDto = {
          sessionId: resAsObject.sessionId,
          roomName: resAsObject.roomName,
          capacity: resAsObject.capacity,
          currentNbPlayers: resAsObject.currentNbPlayers,
          status: resAsObject.status,
          players: resAsObject.players,
        };
    }).catch(err => {
      // Error Mongo
      response.errorResponse =
      {
        status: 500,
        message: "Internal server error",
        reason: err.message
      } as ErrorResponse
    });
    return response
  }
  @Post("/session")
  public async createGameSession(@Body() createSessionRequest: CreateSessionRequest): Promise<CreateSessionResponse> {
    let sessionId = uuidv4();
    const gameSessionIdCreated = await GameSessionService.createGameSessionWithDetails(sessionId, createSessionRequest);
    if (gameSessionIdCreated) {
      return {
        uuid: gameSessionIdCreated,
        errorResponse: null
      }
    } else {
      return {
        uuid: null,
        errorResponse: {
          status: 500,
          message: "Error when creating room",
          reason: "No more infos were given"
        }
      }
    }
  }
}
