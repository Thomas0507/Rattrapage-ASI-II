import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarValidation = ({ open, setOpen, message, duration = 3000 }) => {
  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      sx={{ width: "80vw" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success" variant="filled"
        sx={{ fontSize: "1.2rem", padding: "16px" }}>
            <span>{message}</span>
      </Alert>
    </Snackbar>
  );
};

export default SnackbarValidation;
