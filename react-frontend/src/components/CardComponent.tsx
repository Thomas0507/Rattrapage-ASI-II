import React from "react";
import { Card as CardEntity}  from "../models/Card";
import { Button, CardActions, CardContent, CardMedia, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";

interface CardProps {
    card: CardEntity,
    imageHeight?: number,
    imageWidth?: number,
    hideShowDetails?: boolean
}

const CardComponent = ({card, imageHeight, imageWidth, hideShowDetails}: CardProps) => {
  if (hideShowDetails === undefined || hideShowDetails === null)
  {
    hideShowDetails = false;
  }
    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: imageHeight || 140 }}
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
      {
        hideShowDetails && (
          <Button component={Link} to={"/app/card/" + card.id} size="small">See details</Button>
        )
      }
      </CardActions>
    </Card>
    );

}

export default CardComponent