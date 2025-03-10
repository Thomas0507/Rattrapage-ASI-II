import { Container } from "@mui/material"
import React from "react"
import { Player } from "../../../models/Player"
import { SelectCardComponent } from "../../../components/SelectCardComponent"
import { Card } from "../../../models/Card"

interface GameProcessComponentProps {
    player: Player
}


export const GameProcessComponent = ({player}: GameProcessComponentProps) => {
    
    const handleSelectedCards = (cards: Card[]) => {
        console.log(cards);
    }

    return (
        <Container sx={{maxWidth: "1600px"}}>
            you have {player.cards.length} cards : choose up to 3 cards :
            <SelectCardComponent cards={player.cards} handleCardsSelected={handleSelectedCards} />
        </Container>
    )
}