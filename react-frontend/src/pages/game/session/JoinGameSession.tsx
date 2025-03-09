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
interface GameSessionResponse {
    sessionId: string;
    roomName: string;
    capacity: number;
    currentNbPlayers: number;
    players: PlayerModel[];
    status: string;
}


export const GameComponent = ({username, uuid}: GameComponentProps) => {

    const socket = io('http://localhost:3000/game'); // Connect to namespace

    const [gameSession, setGameSession] = useState<GameSession>(new GameSession());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [roomState, setRoomState] = useState<string>("");
    useEffect(() => {
        joinGameSession()
    }, []);


    const joinGameSession = async(): Promise<void> => {
        await fetch("http://localhost:3000/game/join-session/" + uuid, getOptionsByRequestType(RequestType.GET)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then( text => {
                    setLoading(false);
                    setError(true);
                    setErrorMessage(text);
                });
            }
            setLoading(false);
            const gameSessionResponse: GameSessionResponse = await response.json();
            setGameSession(new GameSession(
                gameSessionResponse.sessionId,
                gameSessionResponse.roomName,
                gameSessionResponse.capacity,
                gameSessionResponse.currentNbPlayers,
                gameSessionResponse.players,
                gameSessionResponse.status
            ));
            setRoomState(gameSession.status);
            socket.emit('joinGame', {gameSessionId: gameSession.sessionId , username: "username"});
    
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
            return (
                <WaitingRoomComponent gameSession={gameSession} updateGameSession={onGameSessionUpdate}/>
            )
        default:
            return (
                <div>
                    <span>logged as : {username}</span>
                </div>
            )
    }


}