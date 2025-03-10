import { Container } from "@mui/material"
import React, { useState } from "react"
import { Player } from "../../../models/Player"
import { SelectCardComponent } from "../../../components/SelectCardComponent"
import { Card } from "../../../models/Card"

interface GameProcessComponentProps {
    player: Player
}


export const GameProcessComponent = ({player}: GameProcessComponentProps) => {
    
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const handleSelectedCards = (cards: Card[]) => {
        setSelectedCards([...cards]);        
    }

    return (
        <Container sx={{maxWidth: "1600px", display: "flex", flexDirection: "column", gap: "2em"}}>
            <SelectCardComponent cards={player.cards} handleCardsSelected={handleSelectedCards} />
        </Container>
    )
}