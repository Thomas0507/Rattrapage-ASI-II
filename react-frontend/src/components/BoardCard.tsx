import { Card, CardContent, Icon } from "@mui/material";
import React, { useEffect, useState } from "react"
import { GameCard } from "../models/GameCard";


interface BoardCardProps {
    card: GameCard;
    handleCardClick: (card: GameCard) => void
    disabled: boolean
}

export const BoardCard = ({card, handleCardClick, disabled}: BoardCardProps) => {

    function getImagePath(mainType: string) {
        return "/assets/" + mainType.toLocaleUpperCase() +".png";
    }

    const onCardSelected = () => {
        handleCardClick(card);
    }

    return (

        <Card  onClick={onCardSelected} sx={{ width: 250, height: 200, margin: 1, backgroundColor: disabled ? 'black' : 'lightblue' }}>
                <div style={{textAlign: 'center', width: "100%"}}>
                    {card.name}
                </div>
                <CardContent sx={{display: 'flex', flexDirection:"column", height: "75%"}}>
                <div style={{flexGrow: 1}}>
                    <div className="left container" style={{display: 'flex', flexDirection:"row", justifyContent: 'space-between'}}>
                        <span>PV: {card.health} / {card.maxHealth}</span>
                        <span>DEF: {card.defense}</span>
                    </div>
                <div>
                    <span>ATK: {card.attack}</span>
                </div>
                </div>               
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>Type:{card.mainType}</span>
                    <img src={getImagePath(card.mainType)} alt="" style={{ width: 24, height: 24 }} />
                </div>
                 </CardContent>
            </Card>
    );
}