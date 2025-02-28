import React from "react"
import { Banner } from "../models/Banner"
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import { useState } from "react"
import { ScouterComponent } from "./ScouterComponent"
import { Link } from "react-router-dom"


interface BannerCardProps {
    banner: Banner
}



const BannerCard = ({banner}: BannerCardProps) =>  {

  const [openModal, setOpenModal] = useState(false);


  function handleScouter() {
    setOpenModal(true);
  }

  function handleSummon() {

  }

  function handleClose() {
    setOpenModal(false);
  }


    return (
    <Card sx={{ maxWidth: "100%" }}>
      <ScouterComponent props={{
          open: openModal,
          handleClose: handleClose,
          featuredCards: banner.featuredCards         
        }} />
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
      <CardActions sx={{justifyContent: 'space-between'}}>
        <Button component={Link} to={"/app/summon/summoning"+ "/" + banner.id} size="small" color="primary">
          {banner.cost}$ Summon! 
        </Button>
        <Button  size="small" color="primary" onClick={() => handleScouter()}>
          Scout what you can get!
        </Button>
      </CardActions>
    </Card>
    )

}


export default BannerCard