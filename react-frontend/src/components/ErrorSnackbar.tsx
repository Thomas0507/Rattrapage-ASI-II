import React, { SyntheticEvent } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


interface ErrorMessage {
  status: number,
  message: string,
  reason: string;
}



const SnackbarError = ({ open, setOpen, message, duration = 3000 }) => {
  const handleClose = (_: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  let parsedMessage: ErrorMessage;
  try {
    parsedMessage = JSON.parse(message);
  } catch(err) {
    parsedMessage = { status: 500, message: 'Unknown error', reason: 'No informations were given. Contact a sysAdmin'}
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      sx={{ width: "80vw" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" variant="filled"
        sx={{ fontSize: "1.2rem", padding: "16px" }}>
            <span>{parsedMessage.status} - {parsedMessage.message}: </span>
        {parsedMessage.reason || "An unexpected error occurred!"}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarError;
