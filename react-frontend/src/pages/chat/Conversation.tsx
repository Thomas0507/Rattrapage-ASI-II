import React, { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
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
import { Player } from "../../models/Player";

// Socket.IO server URL 
const SOCKET_SERVER_URL = "http://localhost:3000/chat";



interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}


interface ConversationProps {
  username: string;
  sendConnectedPlayer: (playerUsernames: string[]) => void
}
interface PlayerSent {
  usernames: string[]
}


const Conversation: React.FC<ConversationProps> = ({username, sendConnectedPlayer}: ConversationProps) => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  // Initialize Socket.IO connection.
  // const socket = io(SOCKET_SERVER_URL, {
  //   transports: ["websocket", "polling", "flashsocket"],
  //   auth: { username: username }, // username,
  //   autoConnect: false
  // });

  const socketRef = useRef<Socket>(null)

  function onConnect() {
    setIsConnected(true);
    console.log("connected");
  }
  function onDisconnect() {
    setIsConnected(false);
  }
  function onMessage(data: Message) {
    setMessages((prevMessages) => [...prevMessages, data]);
  }
  function onPlayerList(data: string[]) {
    const playerUsernames: string[] = [];
    data.forEach(element => {
      if (element) {
        playerUsernames.push(element);
      }  
    });
    console.log(playerUsernames);
    sendConnectedPlayer(playerUsernames);    
  }

  function onReceiveMessage(data: Message) {
    setMessages((prev) => [...prev, data]);
  }

  useEffect(() => {

    if (socketRef.current === null) {
      socketRef.current = io(SOCKET_SERVER_URL, { transports: ["websocket"] , auth: {username}, reconnectionDelay: 2000});
      socketRef.current.on('connect', onConnect);
      socketRef.current.on('disconnect', onConnect);
      socketRef.current.on('message', onMessage);
      socketRef.current.on('receive-message', onReceiveMessage);
      socketRef.current.on('player-list', onPlayerList);
    }

    if (socketRef.current !== null) {
      console.log("event emitted");
      socketRef.current.emit("send-all-players");
    }

      
    
      return () => {
        if (socketRef.current !== null) {
          socketRef.current.off('connect', onConnect);
          socketRef.current.off('disconnect', onDisconnect);
          socketRef.current.off('message', onMessage);
          socketRef.current.off('receive-message', onReceiveMessage);
          socketRef.current.off('player-list', onPlayerList);
          socketRef.current.disconnect();
        }
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
    if (input.trim() && socketRef.current) {
      // Emit the message to the server
      socketRef.current.emit("message", {
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
