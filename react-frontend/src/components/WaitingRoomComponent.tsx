import { useState } from "react"
import React from "react"
import { GameSession } from "../models/GameSession"

interface WaitingRoomComponentProps {
    gameSession: GameSession | undefined;
    updateGameSession: Function;
};


export const WaitingRoomComponent = ({gameSession, updateGameSession}: WaitingRoomComponentProps) => {
    if (gameSession) {
        return(
            <div>
                Waiting Room for {gameSession.roomName}
            </div>
            );
    }
    else {
        return (
            <span>error</span>
        );
    }
}