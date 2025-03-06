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
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import Loader from "../Loader";
import ErrorComponent from "../../components/ErrorComponent";
import { DrawerComponent } from "../../components/DrawerComponent";

// Socket.IO server URL 
const SOCKET_SERVER_URL = "http://localhost:3000";



interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}


interface ConversationProps {
  username: string;
}

const Conversation: React.FC<ConversationProps> = ({username}: ConversationProps) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // Initialize Socket.IO connection.
  const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket", "polling", "flashsocket"],
    auth: { username: username } // username
  });

  useEffect(() => {


      function onConnect() {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);
      }
      function onMessage(data: Message) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }

      function onReceiveMessage(data: Message) {
        setMessages((prev) => [...prev, data]);

      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onConnect);
      socket.on('message', onMessage);
      socket.on('receive-message', onReceiveMessage);
    
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('message', onMessage);
        socket.off('receive-message', onReceiveMessage)
      };
    
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // disconnect user on dismount
  // useEffect( () => () => socket.disconnect(), [] );
  const sendMessage = () => {
    if (input.trim() && socket) {
      // Emit the message to the server
      socket.emit("message", {
        content: input,
        sender: username,
        timestamp: Date.now()
      } as Message);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
                  <Container>
                  </Container> 
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
    </div>

  );
};

export default Conversation;
