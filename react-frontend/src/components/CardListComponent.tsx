import React from "react";
import { Card } from "../models/Card";
import { Container, Typography } from "@mui/material";
import CardComponent from "./CardComponent";
import { useSearchParams } from "react-router-dom";

interface CardListProps {
    cards: Card[]
}


const CardListComponent = ({cards}: CardListProps) => {

    return (
        <Container>
            {/* cards */}
            {cards.length !== 0 ?
                    
                    cards.map(
                        (_card, _index) => (
                            <Container fixed className="card-wrapper">
                                <CardComponent key={_index} card ={_card} imageHeight={140}
                                />
                            </Container>
                        )
                    )
                :
                    <Typography className="center-text">No cards could be found... Maybe we're effectuing a maintenance</Typography>
                }
        </Container>
    )
};

export default CardListComponent;