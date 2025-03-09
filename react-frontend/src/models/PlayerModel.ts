// Used for typing purpose of 'GameSession'
// Used only for gameSession interaction with mongoDb  
export class PlayerModel {
    // playerId is the socket Used for connection
    _playerId: string;
    _playerName: string;
    _status: string;

    constructor(playerId: string, playerName: string, status: string) {
        this._playerId = playerId;
        this._playerName = playerName;
        this._status = status;
    }
}