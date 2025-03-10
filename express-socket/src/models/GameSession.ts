import mongoose, { Schema, Document } from "mongoose";

export interface Player {
    playerId: string;
    playerName: string;
    status?: 'connected' | 'disconnected' | 'ready' | 'waiting';
}

export interface GameSession extends Document {
    sessionId: string;
    roomName: string;
    capacity: number;
    currentNbPlayers: number;
    players: Player[];
    status: 'waiting' | 'in-progress' | 'finished';
    isFull(): boolean;
    addPlayer(player: Player): Promise<GameSession>;
    removePlayer(playerId: string): Promise<GameSession>;
  }

const playerSchema = new Schema({
    playerId: { type: String, required: true, unique: true, sparse: true},
    playerName: { type: String, required: true},
    status: {
      type: String,
      enum: ['connected', 'disconnected', 'ready', 'waiting'],
      default: 'waiting'
    }
  }, { _id: false });

const gameSessionSchema: Schema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  roomName: { type: String, default: "Untitled room"},
  capacity: { type: Number, required: true, default: 2},
  currentNbPlayers: { type: Number, required: true, default: 0},
  players: { type: [playerSchema], default:[] },
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'finished'],
    default: 'waiting'
  },
}, { timestamps: true });

gameSessionSchema.methods.isFull = function () {
    return this.currentNbPlayers >= this.capacity;
};

gameSessionSchema.methods.addPlayer = async function (player: Player) : Promise<GameSession> {
    if (this.isFull()) {
      throw new Error('Room is full');
    }
    this.players.push(player);
    this.currentNbPlayers++;
    return this.save();
};

gameSessionSchema.methods.removePlayer = async function (playerId: string) : Promise<GameSession> {
    this.players = this.players.filter((player: Player) => player.playerId !== playerId);
    this.currentNbPlayers--;
    return this.save();
};

const GameSessionEntity = mongoose.model<GameSession>("GameSession", gameSessionSchema);
export default GameSessionEntity;
