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

// Initialize Socket.IO connection.
const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket", "polling", "flashsocket"],
});

interface Message {
  content: string;
  sender: string;
  timestamp: EpochTimeStamp;
}

interface PlayerDto {
  username: string;
}

const Conversation: React.FC = () => {
  const { user } = useAuth(); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [socket, setSocket] = useState<any>(null);

  const [userName, setUsername] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [players, setPlayers] = useState<PlayerDto[]>([]);
  useEffect(() => {
    // Only initialize the socket connection when user is present
    if (user) {
      //console.log("User ID:", user.id);
      // If you have a token or user id, pass it in auth data:
      
      const fetchData = async () => {
          try {
              const response = await fetch(`http://localhost:8081/player`, getOptionsByRequestType(RequestType.GET, {}));
              const responsePlayers = await fetch(`http://localhost:8081/player/all`, getOptionsByRequestType(RequestType.GET, {}));
              if (!response.ok) {
                return response.text().then( text => {
                  setError(true);
                  setErrorMessage(text);}
                );
              }
              if (!responsePlayers.ok) {
                return responsePlayers.text().then( text => {
                  setError(true);
                  setErrorMessage("");
                });
              }
              const result = await response.json();
              const playerResult = await responsePlayers.json();
              setPlayers(playerResult);
              setUsername(result.username);
              newSocket.emit("join", result.username);
          } catch(err) {
              // setError(true)
              // setErrorMessage("Error encountered")
          } finally {
              setLoading(false);
          }
      };
      fetchData();

      const newSocket = io(SOCKET_SERVER_URL, {
        transports: ["websocket", "polling"],
        auth: { username: userName } // username
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected:" , newSocket.id);
      });

      newSocket.on("message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      newSocket.on("receive-message", (data: Message) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, players]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // disconnect user on dismount
  useEffect( () => () => socket.disconnect(), [] );
  const sendMessage = () => {
    if (input.trim() && socket) {
      // Emit the message to the server
      socket.emit("message", {
        content: input,
        sender: user,
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
      <DrawerComponent players={players}/>
      <Container maxWidth="sm">
        {
          loading ? (<Loader/>) :
          (
            <div>
              { 
                error ? (<ErrorComponent message={errorMessage} />) :
                (
                <div>
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
                  </div>
                )
              }
          </div>
          )
        }

      </Container>
    </div>

  );
};

export default Conversation;
