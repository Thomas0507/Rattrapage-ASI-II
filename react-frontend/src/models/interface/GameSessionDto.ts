import { PlayerModel } from "../PlayerModel";

export interface GameSessionDto {
    sessionId: string;
    roomName: string;
    capacity: number;
    currentNbPlayers: number;
    players: PlayerModel[];
    status: string;
}