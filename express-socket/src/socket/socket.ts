import { Socket, Server as SocketIOServer } from 'socket.io';
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


const users: string[] = [];

interface User {
  id: string;
  socketId: string;
}

const privateUsers = new Map<string, User>();

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
    if (!users.find(el => el === socket.handshake.auth.username)) {
      users.push(socket.handshake.auth.username);
    }

    socket.on('join', (userId: string) => {
      // ?
    });

    socket.on("private-message", ({ sender, receiver, message }) => {
      console.log("received", sender, receiver, message);
      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receive-message", { sender, message });
      }
    });

    socket.on("send-all-players", (scoket) => {
      chatNamespace.emit("player-list", users);
    });




    socket.on("disconnect", () => {
      
      for (let i = 0; i < users.length; i++) {
        if (users[i] === socket.handshake.auth.username) {
          delete users[i];
          break;
        }
      }
      console.log("User disconnected:", socket.id);
      chatNamespace.emit("player-list", users);
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
    console.log(`A player connected: ${socket.id}`);

    socket.on('joinGame', async ({gameSessionId, username}: joinGameSession) => {
      console.log(`gameSessionId received: ${gameSessionId}, \nusername received: ${username}\n`);

      let gameSession = await GameSessionEntity.findOne({"sessionId": gameSessionId});
      console.log(`gamession in db: ${gameSession}`);
      if (!gameSession) {
        console.log("gameSession not found!");
        socket.emit("session-not-found", {status: 404, error: 'Game session not found'} as SocketError);
        return
      }

      if (!gameSession?.players) {
        console.log("instanciate empty players array");
        gameSession.players = [];
      }

      if (!gameSession?.players.find(player => player.playerName === username)) {
        gameSession.players.push({playerId: socket.id, playerName: username, status: 'connected'});
        gameSession.currentNbPlayers += 1;
        try {
          await gameSession.save();
        } catch (err) {
          console.log(`error when triying to save gameSession: ${err.message}`);
        }
      }
      socket.join(gameSession.sessionId);
      console.log(`${username} joined game ${gameSessionId}`)
      // Too much player etc ...

      // 
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


  // private namespace =>
  const privateChatNamespace = io.of("/private");

  privateChatNamespace.on('connection', (socket: Socket)=> {
    console.log(`User connected to private namespace: ${socket.id}`);
    socket.on("register", (username: string) => {
      console.log(`User registered: ${username} with socket ID ${socket.id}`);
      privateUsers.set(username,
        {
          id: username,
          socketId: socket.id
        });
        console.log(`User registered: ${username} - Socket: ${socket.id}`);
    })
    socket.on("private-message", ({senderId, receiverId, message}) =>  {
      console.log(message);
      const receiver = privateUsers.get(receiverId);
      if (receiver) {
        privateChatNamespace.to(receiver.socketId).emit("receive-message", {senderId: senderId, message: {
          content: message.content,
          timestamp: message.timestamp,
          sender: message.sender
        }});
      }
    });
    socket.on('disconnect', ()=>{
      privateUsers.forEach((user, userId) => {
        if (user.socketId === socket.id) {
          privateUsers.delete(userId);
        }
      });
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};
