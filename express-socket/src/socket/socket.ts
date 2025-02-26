import { Server as SocketIOServer } from 'socket.io';
import Message from "../models/message";

export const initSocket = (server: any) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on("message", async (data) => {
      console.log("Message received:", data);
      try {
        // Save the message to the database
        // Assume data is a string and the sender information comes from the authenticated token
        await Message.create({
          content: data,
          //sender: socket.data.user.id, // Adjust according to the payload in your token
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }
      // Broadcast the message to all connected clients
      io.emit("message", {
        content: data,
        //sender: socket.data.user.id,
        timestamp: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};
