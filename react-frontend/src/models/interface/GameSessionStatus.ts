import { GameEvent } from "../../pages/game/session/JoinGameSession";
import { GamePlayer } from "../GamePlayer";
import { GameSession } from "../GameSession";
import { PlayerModel } from "../PlayerModel";
import { GameSessionDto } from "./GameSessionDto";

export interface GameSessionStatus {
    player1: GamePlayer,
    player2: GamePlayer,
    gameSession: GameSession,
    gameEvent: GameEvent;
}