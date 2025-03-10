import React, { useState } from "react";
import { Card } from "../models/Card";
import { Button, Container, Typography } from "@mui/material";
import { CardSelectionComponent } from "./CardSelectionComponent";

export interface SelectCardComponent {
    cards: Card[];
    handleCardsSelected: (cards: Card[]) => void
}

export const SelectCardComponent = ({cards, handleCardsSelected}: SelectCardComponent) => {

    const [selectedCards, setSelectedCards] = useState<Card[]>([]);

    const onCardSelected = (card: Card) => {
        const indexOfCard = selectedCards.findIndex(el => el.id === card.id);
        if (selectedCards.length >= 3 && indexOfCard === -1) {
            return;
        }

        if (indexOfCard === -1) {
            selectedCards.push(card);
        } else {
            
            selectedCards.splice(indexOfCard, 1); 
        }
        setSelectedCards([...selectedCards]);
        // console.log(selectedCards);
    }

    const isCardSelected = (card: Card): boolean => {
        return selectedCards.findIndex(el => el.id === card.id) !== -1;
    }

    const handleReadyButton = () => {
        handleCardsSelected(selectedCards)
    }


    return(
    <div>
        <Typography variant="h3">
            You have {cards.length} cards : choose up to 3 cards :
        </Typography> 

        <Container 
        sx={{padding: "36px", maxWidth: 'fit-content', display: "flex", flexDirection: "row", gap: "5em", flexWrap: 'wrap', justifyContent: 'center'}}>
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
    </div>
    )
}