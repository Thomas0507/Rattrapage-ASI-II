import { Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react"
import { GameCard } from "../models/GameCard";
import { motion } from "framer-motion";

interface BoardCardProps {
    card: GameCard;
    handleCardClick: (card: GameCard) => void
}

export const BoardCard = ({card, handleCardClick}: BoardCardProps) => {


    const onCardSelected = () => {
        handleCardClick(card);
    }

    return (

        <Card  onClick={onCardSelected} sx={{ width: 250, height: 200, margin: 1, backgroundColor: 'lightblue' }}>
                <div style={{textAlign: 'center', width: "100%"}}>{card.name}</div>
                <CardContent sx={{display: 'flex', flexDirection:"row", justifyContent: 'space-between'}}>
                  <div className="left container" style={{display: 'flex', flexDirection: 'column',}}>
                  <span>PV: {card.health} / {card.maxHealth}</span>
                  <span>DEF: {card.defense}</span>
                  </div>
                  <div>
                  <span>ATK: {card.attack}</span>
                  </div>
                 </CardContent>
            </Card>
    );
}