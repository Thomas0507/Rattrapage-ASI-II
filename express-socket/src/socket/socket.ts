import { Server as SocketIOServer } from 'socket.io';
import { getuserNameFromToken } from '../jwt/jwt-service';
import Message from "../models/message";
import message from '../models/message';

interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}

export const initSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
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

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
