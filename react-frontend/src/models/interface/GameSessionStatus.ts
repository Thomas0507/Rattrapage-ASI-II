import { GamePlayer } from "../GamePlayer";
import { PlayerModel } from "../PlayerModel";
import { GameSessionDto } from "./GameSessionDto";

export interface GameSessionStatus {
    player1: GamePlayer,
    player2: GamePlayer,
    gameSession: GameSessionDto;
}