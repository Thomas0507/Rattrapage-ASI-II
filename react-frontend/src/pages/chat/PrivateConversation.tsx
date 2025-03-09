import { Container, Typography, Paper, List, ListItem, ListItemText, Box, TextField, Button } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client";
import { Message } from "../../models/interface/ChatMessage";

const SOCKET_SERVER_URL = "http://localhost:3000/private";

interface PrivateConversationProps {
    username: string;
    sendConnectedPlayer: (playerUsernames: string[]) => void
    receiver: string;
}




export const PrivateConversation = ({username, receiver, sendConnectedPlayer}: PrivateConversationProps) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const socketRef = useRef<Socket>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null);


    // Socket Listening
    function onConnect() {
        console.log("connected private");
        setIsConnected(true);
    }
    function onDisconnect() {
    setIsConnected(false);
    }
    
    function onReceiveMessage(messageWrapped: any) {
        console.log("received Message: ", messageWrapped)
        setMessages((prev) => [...prev, {
            content: messageWrapped.message.content,
            sender: messageWrapped.message.sender,
            timestamp: messageWrapped.message.timestamp
        }]);
    }

    function onPlayerList(data: string[]) {
        const playerUsernames: string[] = [];
        data.forEach(element => {
          if (element) {
            playerUsernames.push(element);
          }  
        });
        sendConnectedPlayer(playerUsernames);    
      }

    useEffect(() => {

        if (socketRef.current === null) {
            console.log("socket is null", socketRef.current);
            socketRef.current = io(SOCKET_SERVER_URL);
            socketRef.current.connect();
            socketRef.current.emit("register", username);
            socketRef.current.on('connect', onConnect);
            socketRef.current.on('disconnect', onDisconnect);
            socketRef.current.on('receive-message', onReceiveMessage);
            socketRef.current.on('player-list', onPlayerList);
        }
      
          if (socketRef.current !== null) {
            
            socketRef.current.emit("send-all-players");
            
          }
      
            
          
            return () => {
              if (socketRef.current !== null) {
                socketRef.current.off('connect', onConnect);
                socketRef.current.off('disconnect', onDisconnect);
                socketRef.current.off('receive-message', onReceiveMessage);
                socketRef.current.off('player-list', onPlayerList);
                socketRef.current.disconnect();
              }
            };
    }, []);



    //   scroll to bottom message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    const sendMessage = () => {
        if (input.trim() && socketRef.current) {
          // Emit the message to the player
          const message = {
            content: input,
            sender: username,
            timestamp: Date.now()
        }as Message
          socketRef.current.emit("private-message", {
            senderId: username,
            receiverId: receiver,
            message: message
          });
          setMessages((prev) => [...prev, message]);
          setInput("");
        }
      };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
    return (<div>
        
        <Container maxWidth="sm">
                  <Container>
                  </Container> 
              <Typography variant="h4" component="h1" gutterBottom align="center">
              Private chat with {receiver}
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

    </div>)
}
