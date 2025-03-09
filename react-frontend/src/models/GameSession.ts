import { PlayerModel } from "./PlayerModel";

export class GameSession {
    private _sessionId: string;

    private _roomName: string;
    
    private _capacity: number;
    
    private _currentNbPlayers: number;
    
    private _players: PlayerModel[];
    
    private _status: string;

    constructor(sessionId: string, roomName: string, capacity: number, currentNbPlayers: number, players: PlayerModel[], status?: string) {
        this._sessionId = sessionId
        this._roomName = roomName
        this._capacity = capacity
        this._currentNbPlayers = currentNbPlayers
        this._players = players
        this._status = status || 'waiting';
    }
    // Getter & Setter => 

    get sessionId(): string {
        return this._sessionId;
    }
    public set sessionId(value: string) {
        this._sessionId = value;
    }

    public get roomName(): string {
        return this._roomName;
    }
    public set roomName(value: string) {
        this._roomName = value;
    }
    public get capacity(): number {
        return this._capacity;
    }
    public set capacity(value: number) {
        this._capacity = value;
    }
    public get currentNbPlayers(): number {
        return this._currentNbPlayers;
    }
    public set currentNbPlayers(value: number) {
        this._currentNbPlayers = value;
    }
    public get players(): PlayerModel[] {
        return this._players;
    }
    public set players(value: PlayerModel[]) {
        this._players = value;
    }
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
}