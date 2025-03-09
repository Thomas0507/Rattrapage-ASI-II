import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GameSession } from "../../../models/GameSession";
import ErrorComponent from "../../../components/ErrorComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import Loader from "../../Loader";
import { PlayerModel } from "../../../models/PlayerModel";

interface GameSessionResponse {
    sessionId: string;
    roomName: string;
    capacity: number;
    currentNbPlayers: number;
    players: PlayerModel[];
    status: string;
}


export const GameSessionPage = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [gameSession, setGameSession] = useState<GameSession>();
    const path = useLocation().pathname.split("/");
    const sessionUUID: string = String(path[path.length-1]);

    useEffect(() => {

    });

    const joinGameSession = async(): Promise<void> => {
    await fetch("http://localhost:3000/game/join-session/" + sessionUUID, getOptionsByRequestType(RequestType.GET)).then(async (response: Response) => {
        if (!response.ok) {
            return response.text().then( text => {
                setLoading(false);
                setErrorMessage(text);
            });
        }
        setLoading(false);
        const gameSessionResponse: GameSessionResponse = await response.json();
        const gameSessionObject = new GameSession(
            gameSessionResponse.sessionId,
            gameSessionResponse.roomName,
            gameSessionResponse.capacity,
            gameSessionResponse.currentNbPlayers,
            gameSessionResponse.players,
            gameSessionResponse.status
        );
        setGameSession(gameSessionObject);
    });
    }

    return (
        <div>
            {
                loading ? (<Loader/>)
                : (
                    <div>
                        {
                            gameSession ? (
                                <div>
                                    test
                                </div>
                            ) : 
                            (<ErrorComponent message={errorMessage}/>)
                        }
                    </div>
                )
            }
        </div>
    )
}

