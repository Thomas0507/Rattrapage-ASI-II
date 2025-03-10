import React, { useState } from "react";
import { Card } from "../models/Card";
import { Button, Container } from "@mui/material";
import { CardSelectionComponent } from "./CardSelectionComponent";

export interface SelectCardComponent {
    cards: Card[];
    handleCardsSelected: (cards: Card[]) => void
}

export const SelectCardComponent = ({cards, handleCardsSelected}: SelectCardComponent) => {

    const [selectedCards, setSelectedCards] = useState<Card[]>([]);

    const onCardSelected = (card: Card) => {
        const indexOfCard = selectedCards.findIndex(el => el.id === card.id) 
        if (indexOfCard === -1) {
            selectedCards.push(card);
        } else {
            selectedCards.splice(indexOfCard, 1); 
        }
        setSelectedCards([...selectedCards]);
        console.log(selectedCards);
    }

    const isCardSelected = (card: Card): boolean => {
        return selectedCards.findIndex(el => el.id === card.id) !== -1;
    }

    const handleReadyButton = () => {
        handleCardsSelected(selectedCards)
    }


    return <Container sx={{padding: "12px", display: "flex", flexDirection: "column", gap: "3em"}}>
        {
            cards.map((_card, _index) => (
                <CardSelectionComponent key={_index} card={_card} onCardSelected={onCardSelected} selected={isCardSelected(_card)}/> 
            ))
        }
        <Button
        fullWidth={true}
        variant="contained"
        disabled={selectedCards.length === 0}
        onClick={handleReadyButton}>
            Ready
        </Button>
    </Container>
}