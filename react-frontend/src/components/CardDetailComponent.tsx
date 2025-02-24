import React from "react"
import { Card } from "../models/Card"
import { Box, CardMedia, Container, Typography } from "@mui/material"
import "../css/CardDetailComponent.css";

interface CardDetailProps {
    card: Card
}

const CardDetailComponent = ({card}: CardDetailProps) => {
    return (
        <Container fixed className="card-box" sx={{ boxShadow: 3 }}> 
            <Typography variant="h3" className="center-text">
                {card.name}
            </Typography>
            <CardMedia className="image-box"
                sx={{ height: 400 }}
                image={card.image}
                title="card image"
            />
            <div className="stat-wrapper">
            <Typography variant="h5" className="center-text">
                Attack: {card.attack}
            </Typography>
            <Typography variant="h5" className="center-text">
                Defense: {card.defense}
            </Typography>
            </div>
            <Typography>
                    {card.name}'s description: 
            </Typography>
            <Box className="description-wrapper" sx={{ boxShadow: 3 }}>
                <Typography>
                    {card.description}
                </Typography>
            </Box>
            <div className="id-wrapper">
                Card's id: {card.id}
            </div>
        </Container>

    )
}

export default CardDetailComponent;