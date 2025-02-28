import React from "react"
import { CardDisplayComponent } from "./CardDisplayComponent";
import { Card } from "../models/Card";

interface SummonProps {
    droppedCards: Card[];
}

export const SummonComponent = ({droppedCards: droppedCards}: SummonProps) => {

    function handleClick (card: Card) {
        console.log(card);
    }

        return (
            <div style={{display: "flex", justifyContent: "center", gap:"2em"}}>
            {
                droppedCards.map((_item, _key) =>
                    <CardDisplayComponent key={_key} card={_item} onClick={ (card) => handleClick(card)}/>            
                )
            }
            </div>
        );
}