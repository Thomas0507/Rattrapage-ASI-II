import { Modal, Box, Typography, MobileStepper, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "../models/Card";
import CardComponent from "./CardComponent";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface ScouterComponentProps {
    props: {
        open: boolean
        handleClose: Function
        featuredCards: Card[]
    };
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const ScouterComponent = ({props}: ScouterComponentProps) => {

    const [openM, setOpen] = useState(props.open); 

    const [activeStep, setActiveStep] = useState(0);
    
    useEffect( () => {
        setOpen(props.open);
    }, [props.open]); 


    const handleClose = () => {
        // props.open = false;
        setOpen(false);
        props.handleClose();
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return(
    <Modal
    open={openM}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Thoses cards have a higher rate of being dropper!
      </Typography>
      <MobileStepper
      variant="dots"
      steps={props.featuredCards.length}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1, marginLeft: 'auto', marginRight: 'auto' }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === props.featuredCards.length - 1}>
            <NavigateNextIcon/>
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeftIcon/>
        </Button>
      }
    />            
        <CardComponent card ={props.featuredCards[activeStep]} imageHeight={140}/>        
    </Box>
  </Modal>)
}