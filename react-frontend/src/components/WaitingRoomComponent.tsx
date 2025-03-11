import { useState } from "react"
import React from "react"
import { GameSession } from "../models/GameSession"
import { Box, Button, Container, Tooltip, Typography } from "@mui/material";

interface WaitingRoomComponentProps {
    gameSession: GameSession | undefined;
    updateGameSession: () => void;
};



export const WaitingRoomComponent = ({gameSession, updateGameSession}: WaitingRoomComponentProps) => {

    const [readyPressed, setReadyPressed] = useState<boolean>(false);

    console.log(gameSession);
    function getToolTipForReadyButton(): string {
        if (!gameSession) {
            return "There is a problem with this game session, try to create another one";
        } 
        if (gameSession?.players.length < 2) {
            return "Get ready";
        }
        if (gameSession.status !== 'waiting') {
            return "Game is launching"
        }
        return '';
    }
    
    function handleReadyClick() {
        setReadyPressed(true);
        updateGameSession();
    }

    if (gameSession) {
        return(
            <div>
                <Container sx={{maxWidth: "1600px", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <Typography >
                        Waiting Room for {gameSession.roomName}

                    </Typography>
                <span>Player in waiting room: {gameSession.currentNbPlayers}</span>
                <Tooltip title={getToolTipForReadyButton()}>
                    <Button
                    disabled={ readyPressed}
                    onClick={handleReadyClick}
                    variant="contained"
                    >
                        Ready
                    </Button>
                    </Tooltip>
                </Container>

            </div>
            );
    }
    else {
        return (
            <span>error</span>
        );
    }
}