import React, { useEffect, useState } from "react"
import { CardDisplayComponent } from "./CardDisplayComponent";
import { Card } from "../models/Card";
import { Button, Container } from "@mui/material";
import { Link } from "react-router";
import RareCardDroppedComponent from "./RareCardDroppedComponent";

interface SummonProps {
    droppedCards: Card[];
}

export const SummonComponent = ({droppedCards}: SummonProps) => {

    const [rareCardDropped, setRareCardDropped] = useState(false);
    let rareCardDroppedMessage = "You have dropped a rare card!"

    function handleClick (card: Card) {
        console.log(card.name, card.rarity);
        if (card.rarity >= 5) {
            setRareCardDropped(true);
        }
    }

        return (
            <div>
                {
                    rareCardDropped && ( <RareCardDroppedComponent message={rareCardDroppedMessage}/>)
                }
                <div style={{display: "flex", justifyContent: "center", gap:"2em", flexWrap: 'wrap', marginTop: '5em'}}>
                {
                    droppedCards.map((_item, _key) =>
                        <div style={{minWidth: '400px'}}>
                            <CardDisplayComponent key={_key} card={_item} onClick={ (card) => handleClick(card)}/>            
                        </div>
                    )
                } 
                </div>
                <Button size="large" sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'flex',
                    backgroundColor:' #1976d2',
                    color: 'white',
                    width: 'fit-content',
                    padding: '1em',
                    fontSize: '24px',
                  
                }} component={Link} to="/app/summon">Finish</Button>
            </div>

        );
}