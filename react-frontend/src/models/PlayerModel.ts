// Used for typing purpose of 'GameSession'

import { GameCard } from "./GameCard";

// Used only for gameSession interaction with mongoDb  
export class PlayerModel {
    // playerId is the socket Used for connection
    private _playerId: string;

    private _playerName: string;

    private _status: string;

    private _cards: GameCard[];

    constructor(playerId?: string, playerName?: string, status?: string, cards?: GameCard[]) {
        this._playerId = playerId || "";
        this._playerName = playerName || "";
        this._status = status || "";
        this._cards = cards || [];
    }

    public get playerId(): string {
        return this._playerId;
    }
    public set playerId(value: string) {
        this._playerId = value;
    }
    public get playerName(): string {
        return this._playerName;
    }
    public set playerName(value: string) {
        this._playerName = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    public get cards(): GameCard[] {
        return this._cards;
    }
    public set cards(value: GameCard[]) {
        this._cards = value;
    }
}