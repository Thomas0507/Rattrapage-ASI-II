import React, { useEffect, useRef, useState } from "react"
import { GameSession } from "../../../models/GameSession"
import { WaitingRoomComponent } from "../../../components/WaitingRoomComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import { PlayerModel } from "../../../models/PlayerModel";
import io, { Socket } from "socket.io-client";
import Loader from "../../Loader";
import ErrorComponent from "../../../components/ErrorComponent";
import { GameProcessComponent } from "./GameProcessComponent";
import { Player } from "../../../models/Player";
import { Card } from "../../../models/Card";
import { GamePlayer } from "../../../models/GamePlayer";
import { GameSessionDto } from "../../../models/interface/GameSessionDto";
import { GameSessionStatus } from "../../../models/interface/GameSessionStatus";
import { GameCard } from "../../../models/GameCard";
import { AlertColor, Container } from "@mui/material";
import { GameResultComponent } from "../../../components/GameResultComponents";
import { GameHistorization } from "../../../models/interface/GameHistorization";
import { truncateString } from "../../../utils/StringUtils";
import SnackbarGameEvent from "../../../components/SnackbarGameEvent";

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
    gameSessionDto: GameSession;
}


interface GameSessionUpdate {
    gameSession: GameSession;
    username: string;
}

interface EndOfTurnEvent {
    username: string;
    gameSessionId: string;
    gameSession: GameSession;
}

interface GameResult {
    winner: string;
    loser: string;
    gameSession: GameSession;
}

export type GameEvent = {
    eventType: string,
    eventTarget: string,
    eventFrom: string,
    color: string;
    attackSuccess: number
}

const SOCKET_SERVER_URL = "http://localhost:3000/game";


export const GameComponent = ({username, uuid}: GameComponentProps) => {

    const [gameSession, setGameSession] = useState<GameSession>(new GameSession());
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [roomState, setRoomState] = useState<string>("");
    const [playerInfo, setPlayerInfo] = useState<Player>(new Player(0, "", [], 0));
    const socketRef = useRef<Socket>(null)

    // snackbar events  
    const [gameEvent, setGameEvent] = useState<GameEvent>({eventType: "", eventTarget: "", eventFrom: "", color:"", attackSuccess: 1});
    const snackbarRef = useRef<any>(null);

    const handleShowSnackbar = () => {
        if (snackbarRef.current) {
          snackbarRef.current.show();
        }
      };


    // game constants
    const [playerOne, setPlayerOne] = useState<any>(new GamePlayer());
    const [playerTwo, setPlayerTwo] = useState<any>(new GamePlayer());
    const [launchGame, setLaunchGame] = useState<boolean>(false);

    const [winner, setWinner] = useState<string>("");

    // socket event handling =>
    function onPlayerJoined(data: GameSessionUpdate) {
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status,
            data.gameSession.elapsedTurn,
            data.gameSession.playerWhoCanPlay
        ))
    }

    function onPlayerIsReady(data: GameSessionUpdate) {
        console.log(data.gameSession);
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status,
            data.gameSession.elapsedTurn,
            data.gameSession.playerWhoCanPlay
        ));
    }

    function gameIsReady(data: GameSessionUpdate) {
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status,
            data.gameSession.elapsedTurn,
            data.gameSession.playerWhoCanPlay
        ))
        setRoomState(data.gameSession.status);
    }

    function gameIsSet(data: GameSessionStatus) {
        console.log(data);
        setPlayerOne(data.player1);
        setPlayerTwo(data.player2);
        setGameSession(new GameSession(
            data.gameSession.sessionId,
            data.gameSession.roomName,
            data.gameSession.capacity,
            data.gameSession.currentNbPlayers,
            data.gameSession.players,
            data.gameSession.status,
            data.gameSession.elapsedTurn,
            data.gameSession.playerWhoCanPlay
        ));
        setLaunchGame(true);
    }

    function onGameResult(data: GameResult) {
        console.log(data);
        setWinner(data.winner);
        console.log("onGameResult", data);
        setGameSession(data.gameSession);
        setRoomState(data.gameSession.status);
    }

    // actionResult
    function onActionResult(data: GameSessionStatus) {
        console.log(data);
        setPlayerOne(data.player1);
        setPlayerTwo(data.player2);
        setGameSession(data.gameSession);
        setGameEvent(data.gameEvent);

        handleShowSnackbar()
        // action ended, need to update everything;
    }
    // end of turn 
    function onTurnEnd(data: EndOfTurnEvent) {
        console.log(data);
        setGameSession(data.gameSession);
        setPlayerOne(data.gameSession.players[0]);
        setPlayerTwo(data.gameSession.players[1]);
    }

    useEffect(() => {
        if (socketRef.current === null) {
            joinGameSession()
            socketRef.current = io(SOCKET_SERVER_URL)
            socketRef.current.connect();
            socketRef.current.on("playerJoined", onPlayerJoined);
            socketRef.current.on("playerIsReady", onPlayerIsReady);
            socketRef.current.on("game-ready", gameIsReady);
            socketRef.current.on("setGame", gameIsSet);
            socketRef.current.on("actionResult", onActionResult);
            socketRef.current.on("turnEnded", onTurnEnd);
            socketRef.current.on("gameResult", onGameResult)
        }

        if (socketRef.current !== null) {
            // event to emit all time
        }

        return () => {
            if (socketRef.current !== null ) {
                socketRef.current.off("onPlayerJoined", onPlayerJoined);
                socketRef.current.off("playerIsReady", onPlayerIsReady);
                socketRef.current.off("game-ready", onPlayerIsReady);
                socketRef.current.off("setGame", gameIsSet);
                socketRef.current.off("actionResult", onActionResult);
                socketRef.current.off("turnEnded", onTurnEnd);
                socketRef.current.off("gameResult", onGameResult)
                socketRef.current.disconnect();
            }
        }
    }, []);

    useEffect(()=> {
        joinGameSession();
        fetchPlayerInfo();
    }, [username])


    //  Api calls =>
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
                gameSessionResponse.gameSessionDto.status,
                gameSessionResponse.gameSessionDto.elapsedTurn,
                gameSessionResponse.gameSessionDto.playerWhoCanPlay
            ));
            setRoomState(gameSession.status);
            if (username && socketRef.current) {
                socketRef.current.emit('joinGame', {gameSessionId: gameSessionResponse.gameSessionDto.sessionId , username: username});
            }            
        });
    }
    const fetchPlayerInfo = async(): Promise<void> => {
        setLoading(true);
        await fetch("http://localhost:8081/player", getOptionsByRequestType(RequestType.GET,)).then(async (response:Response) => {
            if (!response.ok) {
                // could not retrieve player info
                return response.text().then( text => {
                    console.log(text);
                    setLoading(false);
                    setError(true);
                    setErrorMessage(text);
                });
            }
            // response is ok
            const playerInfo = await response.json();
            console.log(playerInfo);
            setPlayerInfo(playerInfo);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        });
    }

    const historizeGame = async(): Promise<void> => {
        console.log(`gameSessionElapsedTurn: ${gameSession.elapsedTurn}, gameSession${gameSession}`);
        await fetch("http://localhost:8081/game/saveGame", getOptionsByRequestType(RequestType.POST, {
            playerOne: playerOne.playerName,
            playerTwo: playerTwo.playerName,
            winner: winner,
            roomName: gameSession.roomName,
            elapsedTurn: gameSession.elapsedTurn,
            uuid: uuid
        } as GameHistorization)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then( text => {
                    console.log(text);
                    setError(true);
                    setErrorMessage(text);
                });
            }
            setLoading(false);
            const hitorizationGameResponse = await response.json();
            console.log(hitorizationGameResponse);
            const url = window.location.href;
            console.log("redirect to: ", truncateString(url, "/app") + "/main");
            window.location.href = truncateString(url, "/app") + "/main" 

        }).catch(err => {
            setError(true);
            setErrorMessage(err.message);
        }).finally(() =>{
            setLoading(false);
        });
    }

    // function called from children =>
    const markAsReady = () => {
        console.log("mark as ready", username, uuid);
        if (socketRef.current !== null){
            socketRef.current.emit("markAsReady", ({username: username, gameSessionId: gameSession.sessionId}));
        }
    }

    const handleCardsSelected = (cards: Card[]) => {
        socketRef.current?.emit("setPlayerInfo", {username: username, gameSessionId: gameSession.sessionId, cards: cards});
    }

    const handleEndofTurn = () => {
        console.log("end of turn");
        socketRef.current?.emit("endOfTurn", {username: username, gameSessionId: gameSession.sessionId});
    }
    // Action game 
    const onAction = (cards: GameCard[]) => {
        console.log("onAction", cards);
        if(socketRef.current) {
            // card one attack card two
            socketRef.current.emit("action", {type: "attack", username: username, selectedCards: cards, gameSessionId: uuid});
        }
    }
    
    const handleModalClosed = async (isWinner: boolean) => {
        console.log(`isWinner: ${isWinner}`);
        socketRef.current?.emit("gameEnded", gameSession.sessionId)
        if (isWinner) {
            // winner get + 500$
        } else {
            // loser get - 500$
        } 
        // add battle history?
        await historizeGame();
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
        case 'in-progress':
            return (<div>
                <span>logged as : {username}</span>
                {/* select card */}
                    <GameProcessComponent
                    player={playerInfo} 
                    onSelectedCard={handleCardsSelected}
                    gameSessionStatus={gameSession}
                    launchGame={launchGame}
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    onAction={onAction}
                    onEndOfTurn={handleEndofTurn}></GameProcessComponent>
                          <SnackbarGameEvent
                            ref={snackbarRef}
                            gameEvent={gameEvent}
                        />
                {/*  */}
                </div>)
        case 'finished':
            return (
                <div>
                    <span>logged as : {username}</span>
                    <GameResultComponent
                    username={username}
                    winner={winner}
                    onModalClose={handleModalClosed}
                    modalTitle={username === winner ? "Victory!" : "Defeat"}
                    modalText={username === winner ? "You won 500$! " : "You lost 500$!"}/>                    
                </div>
            )
        default:
            return (
                <div>
                    <span>logged as : {username}</span>
                    <span>Game has ended, return to the main screen by hitting the home button</span>
                </div>
            )
    }

}