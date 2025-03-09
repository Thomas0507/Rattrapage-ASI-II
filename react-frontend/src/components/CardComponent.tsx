import React from "react";
import { Card as CardEntity}  from "../models/Card";
import { Button, CardActions, CardContent, CardMedia, Typography, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, VariantLabels } from "motion/react";
import { generateStyleFromRarity, generateStyleFromRarityForSummon } from '../utils/MotionStyle';


interface CardProps {
    card: CardEntity,
    imageHeight?: number,
    imageWidth?: number,
    hideShowDetails?: boolean,
    disabled?: boolean
}

const CardComponent = ({card, imageHeight, imageWidth, hideShowDetails, disabled}: CardProps) => {
  if (hideShowDetails === undefined || hideShowDetails === null)
  {
    hideShowDetails = false;
  }
    const animationStyle = generateStyleFromRarityForSummon(card.rarity);

    return (
      <motion.div
      whileHover={animationStyle.whileHover}
      animate={animationStyle.animate}
      transition={animationStyle.transition}
    >
      <Card sx={{ width: '400px' }}>
      <CardMedia
        sx={{ height: imageHeight || '300px',  }}
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
        <Typography variant="h6" color="primary" sx={{ marginTop: 1 }}>
                        Price: {card.price} 💰
        </Typography>
      </CardContent>
      <CardActions>
      {
        !hideShowDetails && (
          <Button disabled={disabled} component={Link} to={"/app/card/" + card.id} size="small">See details</Button>
        )
      }
      </CardActions>
    </Card>
    </motion.div>
    );

}

export default CardComponent