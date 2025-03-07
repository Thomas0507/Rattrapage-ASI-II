import React from "react";
import { Card } from "../models/Card";
import { Container, Typography } from "@mui/material";
import CardComponent from "./CardComponent";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";


interface CardListProps {
    cards: Card[];
    actionLabel?: string; // optionnel
    onActionClick?: (cardId: number) => void; // optionnel
}


const CardListComponent = ({cards, actionLabel, onActionClick}: CardListProps) => {

    return (
        <div className="card-wrapper">
            {/* cards */}
            {cards.length !== 0 ?
                    
                    cards.map(
                        (_card, _index) => (
                            <div className="card-wrapper">
                                <CardComponent key={_index} card ={_card} imageHeight={140}
                                />
                                {actionLabel && onActionClick && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onActionClick(_card.id)}
                                    >
                                        {actionLabel}
                                    </Button>
                                    )}
                            </div>
                        )
                    )
                :
                    <Typography className="center-text">No cards could be found... Maybe we're effectuing a maintenance</Typography>
                }
        </div>
    )
};

export default CardListComponent;