import { Snackbar, Alert, SnackbarOrigin } from "@mui/material";
import React, { useState } from "react";


interface ErrorSnackbarProps {
    openState: boolean,
    errorMessage: string
}

export const ErrorSnackbar = ({openState, errorMessage}: ErrorSnackbarProps) => {

      const [open, setOpen] = useState<boolean>(openState);
      const handleClose = () => {
      setOpen(false);
    }  

    return (
        <Snackbar
        autoHideDuration={6000}
        open={open}
        ><Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
        </Alert>
    </Snackbar>
    )
}