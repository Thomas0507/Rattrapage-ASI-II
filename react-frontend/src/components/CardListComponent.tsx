import React from "react";
import { Card } from "../models/Card";
import { Container, Typography, Button } from "@mui/material";
import CardComponent from "./CardComponent";
import { useSearchParams } from "react-router-dom";
import { wrap } from "framer-motion";

interface CardListProps {
    cards: Card[];
    actionLabel?: string;
    onActionClick?: (card: Card) => void;
    disabled?: boolean;
}


const CardListComponent = ({ cards, actionLabel, onActionClick, disabled }: CardListProps) => {

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: "1em"}}>
            {/* cards */}
            {cards.length !== 0 ?
                    
                    cards.map(
                        (_card, _index) => (
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <CardComponent key={_index} card ={_card} imageHeight={140} disabled={disabled}
                                />
                                {actionLabel && onActionClick && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onActionClick(_card)}
                                    disabled={disabled}
                                >
                                    {actionLabel}
                                </Button>
                                )}
                            </div>
                        )
                    )
                :
                    <Typography className="center-text">No cards could be found... Maybe we're undergoing a maintenance</Typography>
                }
        </div>
    )
};

export default CardListComponent;