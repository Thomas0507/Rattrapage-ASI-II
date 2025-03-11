import { Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Player } from "../../../models/Player"
import { SelectCardComponent } from "../../../components/SelectCardComponent"
import { Card } from "../../../models/Card"
import { GameMainComponent } from "../../../components/GameMainComponent"
import { GameSessionStatus } from "../../../models/interface/GameSessionStatus"
import { PlayerModel } from "../../../models/PlayerModel"
import { GameSessionDto } from "../../../models/interface/GameSessionDto"
import { GameSession } from "../../../models/GameSession"
import { GamePlayer } from "../../../models/GamePlayer"
import { GameCard } from "../../../models/GameCard"

interface GameProcessComponentProps {
    player: Player;
    onSelectedCard: (cards: Card[]) => void
    gameSessionStatus: GameSession;
    launchGame: boolean;
    playerOne: GamePlayer;
    playerTwo: GamePlayer;
    onAction: (cards: GameCard[]) => void;
    onEndOfTurn: () => void;
}


export const GameProcessComponent = ({player, onSelectedCard, gameSessionStatus, launchGame, playerOne, playerTwo, onAction, onEndOfTurn}: GameProcessComponentProps) => {
    
    // use only unique card
    const getUniqueCard = (): Card[] => {
        const uniqueCard: Card[] = [];
        player.cards.forEach(card => {
            if (uniqueCard.findIndex(el => el.id === card.id) === -1) {
                uniqueCard.push(card)
            }
        })
        return uniqueCard;
    }
    const [cardSelected, setCardSelected] = useState<boolean>(false);
    const [gameSession, setGameStatus] = useState<GameSession>(new GameSession);
    const [filteredCards, setFilteredCards] = useState<Card[]>(getUniqueCard());
    
    useEffect(() => {
    }, [gameSession, playerOne, playerTwo]);

    // fired when cards are selected => trigger the start of the game if both players selected theirs cards
    const handleSelectedCards = (cards: Card[]) => {
        onSelectedCard(cards);
    }

    const handleEndOfTurn = () => {
        onEndOfTurn();
    }

    const handleGameAction = (data: GameCard[]) => {
        console.log("handleGameAction", data);
        onAction(data)
    }
    return (
        <Container sx={{maxWidth: "1600px", display: "flex", flexDirection: "column", gap: "2em"}}>
            { !launchGame ? (
                // select card
                <SelectCardComponent cards={filteredCards} handleCardsSelected={handleSelectedCards} />
            ) : 
                // game
            (
                <GameMainComponent actionHandling={handleGameAction} playerOne={playerOne} playerTwo={playerTwo} gameSession={gameSessionStatus} username={player.username} endOfTurnFunction={handleEndOfTurn}/>
            )   
        }
        </Container>
    )
}