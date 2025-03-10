import React from "react";
import { Card as CardModel} from "../models/Card";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";

interface CardSelectionComponentProps {
    card: CardModel;
    onCardSelected: Function
}

export const CardSelectionComponent = ({card, onCardSelected}: CardSelectionComponentProps) => {

    const handleCardClick = () => {
        console.log(card);
        onCardSelected(card);
    }

    return(
        <Container >
            <Card sx={{ width: '400px' }}>
            <CardMedia
                onClick={() => handleCardClick}
                sx={{ height: '300px'}}
                image={card.image}
                title="card image"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {card.name}
            </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary', height: '170px', overflow: 'scroll' }}>
                        {card.description}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button onClick={handleCardClick}>
                    Select
                </Button>
            </CardActions>
            </Card>
        </Container>


    );
}