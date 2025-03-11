import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";


interface GameResultComponentProps {
    username: string;
    winner: string;
    onModalClose: (isWinner: boolean) => void
    modalTitle: string;
    modalText: string;
}

export const GameResultComponent = ({username, winner, onModalClose, modalTitle, modalText}: GameResultComponentProps) => {

    const [open, setOpen] = useState<boolean>(true);
 
    const handleClose = () => {
      setOpen(false);
      // player closed the modal, game has ended
      onModalClose(username === winner);
    };
    return (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
        <Typography variant="h6" component="h3" gutterBottom>
          {modalTitle}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {modalText}
        </Typography>
        {/* <Typography variant="subtitle1" component="p">
          {modalSubText}
        </Typography> */}
        <Button
        variant="contained"
        onClick={handleClose}>
          OK
        </Button>
        </Box>
      </Modal>
    );
};