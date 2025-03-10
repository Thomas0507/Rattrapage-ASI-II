import React, { useState } from "react";
import { Card } from "../models/Card";
import { Button } from "@mui/material";
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

    const handleReadyButton = () => {
        handleCardsSelected(selectedCards)
    }


    return <div>
        {
            cards.map((_card, _index) => (
                <CardSelectionComponent key={_index} card={_card} onCardSelected={onCardSelected}/> 
            ))
        }
        <Button
        disabled={selectedCards.length === 0}
        onClick={() => handleReadyButton}>
            Ready
        </Button>
    </div>
}