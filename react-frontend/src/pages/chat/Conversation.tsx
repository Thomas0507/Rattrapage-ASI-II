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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Listen for incoming messages from the server.
  useEffect(() => {
    socket.on("message", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    // Clean up when the component unmounts.
    return () => {
      socket.off("message");
    };
  }, []);

  // Scroll to the bottom whenever a new message is added.
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send a message to the server.
  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  // Allow sending the message via Enter key.
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
