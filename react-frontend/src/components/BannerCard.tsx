import React from "react"
import { Banner } from "../models/Banner"
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"


interface BannerCardProps {
    banner: Banner
}

const BannerCard = ({banner}: BannerCardProps) =>  {
  console.log(banner);
    return (
    <Card sx={{ maxWidth: "100%" }}>
        <CardMedia className="image-box"
                sx={{ height: 320 }}
                image={banner.imageUrl}
                title="card image"
            />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {banner.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {banner.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          {banner.cost}$ Summon! 
        </Button>
      </CardActions>
    </Card>
    )

}


export default BannerCard