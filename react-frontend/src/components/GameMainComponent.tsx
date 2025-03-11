import { Box, Button, Card, CardContent, Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GameSession } from "../models/GameSession";
import { PlayerModel } from "../models/PlayerModel";
import { GamePlayer } from "../models/GamePlayer";
import { BoardCard } from "./BoardCard";
import { GameCard } from "../models/GameCard";
import { motion } from "framer-motion";

// Contains all game logic
export interface GameMainComponentProps {
    actionHandling: Function;
    gameSession: GameSession;
    playerOne: GamePlayer;
    playerTwo: GamePlayer;
    username: string // player logged in
    endOfTurnFunction: Function
}


export const GameMainComponent = ({username, playerOne, playerTwo, gameSession, actionHandling, endOfTurnFunction}: GameMainComponentProps) => {

  const [adversaryUsername, setAdversaryUsername] = useState<string>("");


  
  const [playerOneCards, setPlayerOneCards] = useState<GameCard[]>(playerOne.cards);
  const [playerTwoCards, setplayerTwoCards] = useState<GameCard[]>(playerTwo.cards);
  
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);

  useEffect(() => {
      console.log("rerendering game main component", username, gameSession.playerWhoCanPlay);
      setPlayerOneCards(playerOne.cards);
      setplayerTwoCards(playerTwo.cards)

      setPlayerAsBottom();
    }, [adversaryUsername, playerOneCards, playerTwoCards, gameSession]);

    function setPlayerAsBottom() {
      if (playerOne.playerName === username) {
        playerOne.isBottom = true;
        setAdversaryUsername(playerTwo.playerName);
      }
      if (playerTwo.playerName === username) {
        playerTwo.isBottom = true;
        setAdversaryUsername(playerOne.playerName);
      }
    }

    function resetAllCard() {
      playerOneCards.forEach(card => {
        card.selected = false;
      })
      playerTwoCards.forEach(card => {
        card.selected = false;
      })
      setPlayerOneCards([...playerOneCards]);
      setplayerTwoCards([...playerTwoCards]);
      console.log("should have been reset");
    }

    function updateCard(card: GameCard) {
      if (card.owner === playerOneCards[0].owner) {
        const foundCard = playerOneCards.find(el => el.id === card.id);
        if (foundCard) {
          foundCard.selected = !foundCard.selected;
          setPlayerOneCards([...playerOneCards]);
        }
      } else {
        const foundCard = playerTwoCards.find(el => el.id === card.id);
        if (foundCard) {
          foundCard.selected = !foundCard.selected;
          setplayerTwoCards([...playerTwoCards]);
        }
      }

    }


    const onCardClicked = (card: GameCard) => {
      console.log("test");
      console.log(selectedCards.length);
      const selectedCardsLength = selectedCards.length;
      switch(selectedCardsLength) {
        case 0 :
          if (card.owner === username) {
            console.log(card.owner, username);
            // user selected is own card first
            selectedCards.push(card);
            setSelectedCards([...selectedCards]);
            updateCard(card);
          }
          break;
        case 1 :
          if (selectedCards[0].owner === card.owner) {
            //  error, can't attack own card
            setSelectedCards([]);
            resetAllCard();
          } else {
            //  event is ok
            selectedCards.push(card);
            setSelectedCards([...selectedCards]);

            resetAllCard();
            actionHandling(selectedCards)
            setSelectedCards([...selectedCards]);
          }
        case 2 : 
          resetAllCard();
          setSelectedCards([]);
          break;
        default:
          setSelectedCards([]);
          break;
      }
   
    }

    const handleEndOfTurn = () => {
      endOfTurnFunction(username);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '85vh', justifyContent: 'center', alignItems: 'center' }}>
      {/* (Top) */}
      <Typography variant="h2">{adversaryUsername}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, flexGrow: 1}}>
        {
          adversaryUsername === playerOne.playerName ? (
            playerOneCards.map((card, index) => (
              <motion.div key={index}
              animate={card.selected ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.8 }}>
                <BoardCard card={card} handleCardClick={onCardClicked}/>
              </motion.div>
            ))
          ) : (
            playerTwoCards.map((card, index) => (
              <motion.div key={index}
              animate={card.selected ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.8 }}>
                <BoardCard card={card} handleCardClick={onCardClicked}/>
              </motion.div>
            ))
          )
        }
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', width: "100%", gap: "2em"}}>
        <div>
          Turn n°{gameSession.elapsedTurn}
        </div>
        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black', flexGrow: 1}}/>
        <div style={{display: "flex", flexDirection: "column", gap:"0.5em"}}>
          <Button
          sx={{width: "fit-content"}}
          disabled={gameSession.playerWhoCanPlay !== username}
          variant="contained"
          color="primary"
          onClick={handleEndOfTurn}>
            End of turn
          </Button>
          <span>
            action point left: {
            adversaryUsername !== playerOne.playerName ? (playerOne.actionPoint) : (playerTwo.actionPoint)}
          </span>
        </div>
      </Box>
      {/* Player 1 (Bottom) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexGrow: 1, alignItems: "flex-end"}}>
        {
          playerOne.playerName !== adversaryUsername ? (
            playerOneCards.map((card, index) => (
              <motion.div key={index}
              animate={card.selected ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.8 }}>
                <BoardCard card={card} handleCardClick={onCardClicked}/>
              </motion.div>
            ))
          ) : (
            playerTwoCards.map((card, index) => (
              <motion.div key={index}
              animate={card.selected ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.8 }}>
                <BoardCard card={card} handleCardClick={onCardClicked}/>
              </motion.div>
            ))
          )
        }
      </Box>
      <Typography variant="h2">{username}</Typography>
    </Box>


    )
}