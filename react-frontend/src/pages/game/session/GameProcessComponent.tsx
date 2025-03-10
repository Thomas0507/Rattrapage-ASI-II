import { Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Player } from "../../../models/Player"
import { SelectCardComponent } from "../../../components/SelectCardComponent"
import { Card } from "../../../models/Card"

interface GameProcessComponentProps {
    player: Player
}


export const GameProcessComponent = ({player}: GameProcessComponentProps) => {
    
    const getUniqueCard = (): Card[] => {
        const uniqueCard: Card[] = [];
        player.cards.forEach(card => {
            if (uniqueCard.findIndex(el => el.id === card.id) === -1) {
                uniqueCard.push(card)
            }
        })
        return uniqueCard;
    }
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>(getUniqueCard());
    console.log(filteredCards);



    const handleSelectedCards = (cards: Card[]) => {
        setSelectedCards([...cards]);        
    }

    return (
        <Container sx={{maxWidth: "1600px", display: "flex", flexDirection: "column", gap: "2em"}}>
            <SelectCardComponent cards={filteredCards} handleCardsSelected={handleSelectedCards} />
        </Container>
    )
}