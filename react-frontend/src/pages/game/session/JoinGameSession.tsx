import React, { useEffect, useRef, useState } from "react"
import { GameSession } from "../../../models/GameSession"
import { WaitingRoomComponent } from "../../../components/WaitingRoomComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import { PlayerModel } from "../../../models/PlayerModel";
import io, { Socket } from "socket.io-client";
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
interface GameSessionUpdate {
    gameSession: GameSessionDto;
    username: string;
}


const SOCKET_SERVER_URL = "http://localhost:3000/game";


export const GameComponent = ({username, uuid}: GameComponentProps) => {

    const [gameSession, setGameSession] = useState<GameSession>(new GameSession());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [roomState, setRoomState] = useState<string>("");

    const socketRef = useRef<Socket>(null)

    function onPlayerJoined(data: GameSessionUpdate) {
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status
        ))
    }

    function onPlayerIsReady(data: GameSessionUpdate) {
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status
        ))
        console.log(gameSession);
    }

    useEffect(() => {
        if (socketRef.current === null) {
            joinGameSession()
            socketRef.current = io(SOCKET_SERVER_URL)
            socketRef.current.connect();
            socketRef.current.on("playerJoined", onPlayerJoined);
            socketRef.current.on("playerIsReady", onPlayerIsReady);
        }

        if (socketRef.current !== null) {
            // event to emit all time
        }

        return () => {
            if (socketRef.current !== null ) {
                socketRef.current.off("onPlayerJoined", onPlayerJoined);
                socketRef.current.off("playerIsReady", onPlayerIsReady)
                socketRef.current.disconnect();
            }
        }
    }, []);

    useEffect(()=> {
        joinGameSession()
    }, [username])


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
            if (username && socketRef.current) {
                socketRef.current.emit('joinGame', {gameSessionId: gameSessionResponse.gameSessionDto.sessionId , username: username});
            }            
        });
        }

    const markAsReady = () => {
        console.log("mark as ready", username, uuid);
        if (socketRef.current !== null){
            socketRef.current.emit("markAsReady", ({username: username, gameSessionId: gameSession.sessionId}));
        }
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
                    <WaitingRoomComponent gameSession={gameSession} updateGameSession={markAsReady}/>
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