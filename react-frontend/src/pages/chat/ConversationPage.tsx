import React, { useEffect, useState } from "react"
import Conversation from "./Conversation"
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import Loader from "../Loader";
import ErrorComponent from "../../components/ErrorComponent";
import { Box, Typography } from "@mui/material";
import { Player } from "../../models/Player";
import { PlayerDisplay } from "../../components/PlayerDisplay";

export const ConversationPage = () => {

    const [players, setPlayers] = useState<Player[]>([]);
    const [connectedUsername, setConnectedUsername] = useState<string[]>([]);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<any>("");

    const retrievePlayerUsernames = (playerUsernames: string[]) => {
        // console.log(playerUsernames);
        setConnectedUsername(playerUsernames);
    }

    const isPlayerConnected = (player: Player): boolean => {
        const p = connectedUsername.find(p => p === player.username);
        return p ? true : false;
    }


    useEffect(() => {
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
                  } catch(err) {
                      // setError(true)
                      // setErrorMessage("Error encountered")
                  } finally {
                      setLoading(false);
                  }
              };
              
              fetchData();
    }, []);

    return (
    <div>
        {
            loading ? (<Loader/>) :
            <div>
                {
                    error ? ( <ErrorComponent message={errorMessage}/>) :
                    (
                        // todo: add player list =>
                        // todo: add navigation to private chat
                        <Box display="flex"  height={"80vh"}>
                            {/* Sidebar */}
                            <Box
                                sx={{
                                width: 200, // Fixed width
                                backgroundColor: "#f0f0f0",
                                padding: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                }}
                            >            
                                <Typography>List of players</Typography>
                                {
                                    players && (
                                        players.map(
                                        (_player, _index) => (
                                            <PlayerDisplay key={_index} player = {{username: _player.username, connected: isPlayerConnected(_player)}}
                                        />
                                    ))
                                    )
                                }
                            </Box>

                            {/* Main Content */}
                            <Box
                                sx={{
                                flex: 1, // Takes up remaining space
                                backgroundColor: "#fff",
                                padding: 2,
                                }}
                            >
                                <Conversation username={username} sendConnectedPlayer={retrievePlayerUsernames}/>
                            </Box>
                        </Box>
                    )
                }
            </div>
        }

    </div>
    )
}