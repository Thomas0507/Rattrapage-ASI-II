import { Player } from "../models/GameSession";
import GameSessionEntity from "../models/GameSession";
import { Document } from 'mongoose';

interface GameSessionService {
    createGameSession(sessionId: string): Promise<Document>;
    addPlayerToGameSession(sessionId: string, player: Player): Promise<Document>;
    removePlayerFromGameSession(sessionId: string, playerId: string): Promise<Document>;
    getGameSessionById(sessionId: string): Promise<Document | null>;
    updateGameSessionState(sessionId: string, newState: 'waiting' | 'in-progress' | 'finished'): Promise<Document>;
    deleteGameSession(sessionId: string): Promise<Document | null>;
}

class GameSessionService implements GameSessionService {
    static async createGameSession(sessionId: string): Promise<Document> {
        try {
            const newGameSession = new GameSessionEntity({ sessionId });
            const savedGameSession = await newGameSession.save();
            return savedGameSession;
        } catch (error) {
            throw new Error('Error creating game session: ' + error.message);
        }
    }

    static async addPlayerToGameSession(sessionId: string, player: Player): Promise<Document> {
        try {
            const gameSession = await GameSessionEntity.findOne({ sessionId });
            if (!gameSession) {
                throw new Error('Game session not found');
            }

            if (gameSession.isFull()) {
                throw new Error('Game session is full');
            }

            await gameSession.addPlayer(player);
            return gameSession;
        } catch (error) {
            throw new Error('Error adding player to game session: ' + error.message);
        }
    }

    static async removePlayerFromGameSession(sessionId: string, playerId: string): Promise<Document> {
        try {
            const gameSession = await GameSessionEntity.findOne({ sessionId });
            if (!gameSession) {
                throw new Error('Game session not found');
            }

            await gameSession.removePlayer(playerId);
            return gameSession;
        } catch (error) {
            throw new Error('Error removing player from game session: ' + error.message);
        }
    }

    static async getRoomById(sessionId: string): Promise<Document | null> {
        try {
            const gameSession = await GameSessionEntity.findOne({ sessionId });
            return gameSession;
        } catch (error) {
            throw new Error('Error fetching game session: ' + error.message);
        }
    }

    static async updateGameSessionState(sessionId: string, newState: 'waiting' | 'in-progress' | 'finished'): Promise<Document> {
        try {
            const gameSession = await GameSessionEntity.findOne({ sessionId });
            if (!gameSession) {
            throw new Error('Game session not found');
            }

            gameSession.status = newState;
            await gameSession.save();
            return gameSession;
        } catch (error) {
            throw new Error('Error updating game session state: ' + error.message);
        }
    }

    static async deleteGameSession(sessionId: string): Promise<Document | null> {
        try {
            const gameSession = await GameSessionEntity.findOneAndDelete({ sessionId });
            return gameSession;
        } catch (error) {
            throw new Error('Error deleting game session: ' + error.message);
        }
    }
}

export default GameSessionService;