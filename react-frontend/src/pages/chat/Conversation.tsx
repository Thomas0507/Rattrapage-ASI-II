import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import {
  Container,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth"; 

// Socket.IO server URL 
const SOCKET_SERVER_URL = "http://localhost:3000";

// Initialize Socket.IO connection.
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

interface Message {
  content: string;
  sender: string;
  timestamp: string;
}

const Conversation: React.FC = () => {
  const { user } = useAuth(); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [socket, setSocket] = useState<any>(null);


  useEffect(() => {
    // Only initialize the socket connection when user is present
    if (user) {
      console.log("User ID:", user.id);
      // If you have a token or user id, pass it in auth data:
      const newSocket = io(SOCKET_SERVER_URL, {
        transports: ["websocket", "polling"],
        auth: { token: user.token, userId: user.id } // adjust as per your auth object
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });

      newSocket.on("message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      // Emit the message to the server
      socket.emit("message", input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Chat Conversation
      </Typography>
      <Paper
        elevation={3}
        sx={{
          height: 400,
          overflowY: "auto",
          p: 2,
          mb: 2,
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${msg.sender || "User"}: ${msg.content}`}
                secondary={new Date(msg.timestamp).toLocaleTimeString()}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>
      <Box display="flex" alignItems="center">
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          sx={{ ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default Conversation;
