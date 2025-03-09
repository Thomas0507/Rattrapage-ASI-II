import React, { useEffect, useState } from "react"
import { GameSession } from "../../../models/GameSession"
import { WaitingRoomComponent } from "../../../components/WaitingRoomComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import { PlayerModel } from "../../../models/PlayerModel";
import io from "socket.io-client";
import Loader from "../../Loader";
import ErrorComponent from "../../../components/ErrorComponent";

interface GameComponentProps {
    username: string;
    uuid: string;
}

interface ErrorResponse {
    status: number;
    message: string;
    reason: string;
}

interface JoinSessionResponse {
    errorResponse: ErrorResponse;
    gameSessionDto: GameSessionDto;
}

interface GameSessionDto {
    sessionId: string;
    roomName: string;
    capacity: number;
    currentNbPlayers: number;
    players: PlayerModel[];
    status: string;
}


export const GameComponent = ({username, uuid}: GameComponentProps) => {

    const socket = io('http://localhost:3000/game', {autoConnect: false}); // Connect to namespace

    const [gameSession, setGameSession] = useState<GameSession>(new GameSession());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [roomState, setRoomState] = useState<string>("");

    useEffect(() => {
        if (username) {
            joinGameSession()
        }
        return () => {
            socket.disconnect();
        }
    }, [username]);


    const joinGameSession = async(): Promise<void> => {
        await fetch("http://localhost:3000/game/join-session/" + uuid, getOptionsByRequestType(RequestType.GET)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then( text => {
                    console.log(text);
                    setLoading(false);
                    setError(true);
                    setErrorMessage(text);
                });
            }
            setLoading(false);
            const gameSessionResponse: JoinSessionResponse = await response.json();
            setGameSession(new GameSession(
                gameSessionResponse.gameSessionDto.sessionId,
                gameSessionResponse.gameSessionDto.roomName,
                gameSessionResponse.gameSessionDto.capacity,
                gameSessionResponse.gameSessionDto.currentNbPlayers,
                gameSessionResponse.gameSessionDto.players,
                gameSessionResponse.gameSessionDto.status
            ));
            setRoomState(gameSession.status);
            socket.connect();
            socket.emit('joinGame', {gameSessionId: gameSessionResponse.gameSessionDto.sessionId , username: username});
            
        });
        }

    function onGameSessionUpdate() {

    }
    if (loading) {
        return <Loader />
    }
    if (error) {
        return <ErrorComponent message={errorMessage} />
    }

    switch(roomState) {
        case 'waiting':
            return (<div>
                    <span>logged as : {username}</span>
                    <WaitingRoomComponent gameSession={gameSession} updateGameSession={onGameSessionUpdate}/>
                    </div>
            )
        default:
            return (
                <div>
                    <span>logged as : {username}</span>
                </div>
            )
    }


}