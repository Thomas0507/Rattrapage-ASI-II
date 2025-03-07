import React from "react";
import { Card } from "../models/Card";
import { Container, Typography, Button } from "@mui/material";
import CardComponent from "./CardComponent";
import { useSearchParams } from "react-router-dom";

interface CardListProps {
    cards: Card[];
    actionLabel?: string;
    onActionClick?: (cardId: number) => void;
}


const CardListComponent = ({ cards, actionLabel, onActionClick }: CardListProps) => {

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