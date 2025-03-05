import { Server as SocketIOServer } from 'socket.io';
import { getuserNameFromToken } from '../jwt/jwt-service';
import Message from "../models/message";
import message from '../models/message';

interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}

interface UserMap {
  [key: string]: string; // Maps userId to socketId
}

const users: UserMap = {};

export const initSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  

  io.on('connection', (socket) => {
    // console.log('Client connected:', socket.id);

    socket.on('join', (userId: string) => {
      users[userId] = socket.id;
      // console.log(`${userId} joined with socket ID: ${socket.id}`);
    });

    socket.on("private-message", ({ sender, receiver, message }) => {
      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive-message", { sender, message });
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
      const username: string = getuserNameFromToken(data.sender);
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
      io.emit("message", {
        content: data.content,
        sender: username,
        timestamp: data.timestamp,
      });
      
    });

  });

  return io;
};
