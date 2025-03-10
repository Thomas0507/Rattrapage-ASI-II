import { useState } from "react"
import React from "react"
import { GameSession } from "../models/GameSession"
import { Box, Button, Container, Typography } from "@mui/material";

interface WaitingRoomComponentProps {
    gameSession: GameSession | undefined;
    updateGameSession: () => void;
};


export const WaitingRoomComponent = ({gameSession, updateGameSession}: WaitingRoomComponentProps) => {
    if (gameSession) {
        return(
            <div>
                <Container sx={{maxWidth: "1600px", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <Typography >
                        Waiting Room for {gameSession.roomName}

                    </Typography>
                <span>Player in waiting room: {gameSession.currentNbPlayers}</span>
                <Button
                disabled={gameSession.players.length < 2}
                onClick={updateGameSession}
                >
                    Ready
                </Button>
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