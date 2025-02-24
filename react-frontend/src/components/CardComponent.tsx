import React from "react";
import { Card as CardEntity}  from "../models/Card";
import { Button, CardActions, CardContent, CardMedia, Typography, Card } from "@mui/material";

interface CardProps {
    card: CardEntity
}

const CardComponent = ({card}: CardProps) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={card.image}
        title="card image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {card.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See details</Button>
      </CardActions>
    </Card>
    );

}

export default CardComponent