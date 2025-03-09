import { Server as SocketIOServer } from 'socket.io';
import { getuserNameFromToken } from '../jwt/jwt-service';
import Message from "../models/message";
import message from '../models/message';
import GameSessionEntity, { GameSession } from '../models/GameSession';

interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}


interface joinGameSession {
  gameSessionId: string;
  username: string;
}

interface SocketError {
  status: number;
  error : string;
}

interface UserMap {
  [key: string]: string; // Maps userId to socketId
}

const users: UserMap = {};

export const initSocket = (server: any) => {
  
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  
  // chat namespace =>
  const chatNamespace = io.of("/chat");
  
  chatNamespace.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);

    socket.on('join', (userId: string) => {
      users[userId] = socket.id;
      // console.log(`${userId} joined with socket ID: ${socket.id}`);
    });

    socket.on("private-message", ({ sender, receiver, message }) => {
      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receive-message", { sender, message });
      }
    });

    socket.on("disconnect", () => {
      
      for (const userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });

    socket.on("message", async (data: Message) => {
      // const username: string = getuserNameFromToken(data.sender);
      const username = data.sender;
      console.log("Message received:", data, username);
      try {
 
        // Save the message to the database
        await Message.create({
          content: data.content,
          sender: username, // Adjust according to the payload in your token
          createdAt: data.timestamp
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
      // Broadcast the message to all connected clients
      chatNamespace.emit("message", {
        content: data.content,
        sender: username,
        timestamp: data.timestamp,
      });
      
    });

  });

  // game namespace => 
  const gameNamespace = io.of("/game");

  gameNamespace.on('connection', async (socket) => {
    console.log(`A player connecter: ${socket.id}`);

    socket.on('joinGame', async ({gameSessionId, username}: joinGameSession) => {
      let gameSession = await GameSessionEntity.findOne({gameSessionId});

      if (gameSession) {
        console.log("gameSession not found!");
        socket.emit("session-not-found", {status: 404, error: 'Game session not found'} as SocketError);
      }
      if (!gameSession.players.find(player => player.playerName === username)) {
        gameSession.players.push({playerId: socket.id, playerName: username, status: 'connected'});
        await gameSession.save();
      }
      socket.join(gameSession.sessionId);
      console.log(`${username} joined game ${gameSessionId}`)

      gameNamespace.to(gameSessionId).emit('playerJoined', { gameSessionId, username});
      socket.emit('gameState', gameSession);
    });
    // Player actions =>
    socket.on('play', ({gameSessionId, move }) => {
      console.log(`Move in game ${gameSessionId}`)
      gameNamespace.to(gameSessionId).emit('updateGame', { gameSessionId, move });
      });

    // Handle disconnect =>
    socket.on('disconnect', async() => {
      console.log(`Player disconnected with: ${socket.id}`);
      const gameSession = await GameSessionEntity.findOne({ "players.playerId ": socket.id });
      if (gameSession) {
        const playerWhoLeft = gameSession.players.find(p => p.playerId === socket.id);
        gameSession.players = gameSession.players.filter(player => player.playerId === socket.id);
        await gameSession.save();
        gameNamespace.to(gameSession.sessionId).emit('playerleft', {socketId: socket.id, username: playerWhoLeft.playerName});
      }
    })

  });
  return io;
};
