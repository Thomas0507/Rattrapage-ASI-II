import { Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Player } from "../../../models/Player"
import { SelectCardComponent } from "../../../components/SelectCardComponent"
import { Card } from "../../../models/Card"

interface GameProcessComponentProps {
    player: Player;
    onSelectedCard: (cards: Card[]) => void
}


export const GameProcessComponent = ({player, onSelectedCard}: GameProcessComponentProps) => {
    
    const [cardSelected, setCardSelected] = useState<boolean>(false);

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



    const handleSelectedCards = (cards: Card[]) => {
        setSelectedCards([...cards]);
        onSelectedCard(cards);

    }

    return (
        <Container sx={{maxWidth: "1600px", display: "flex", flexDirection: "column", gap: "2em"}}>
            { !cardSelected ? (
                // select card
                <SelectCardComponent cards={filteredCards} handleCardsSelected={handleSelectedCards} />
            ) : 
                // game 
            (<span>
                {selectedCards[0].name} {selectedCards[1].name} {selectedCards[2].name};
            </span>) 
            
        }
        </Container>
    )
}