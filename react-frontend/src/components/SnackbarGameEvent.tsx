import { useState, useImperativeHandle, forwardRef } from "react";
import { Snackbar, Alert, AlertColor, AlertPropsColorOverrides } from "@mui/material";
import React from "react";
import { GameEvent } from "../pages/game/session/JoinGameSession";

type SnackbarGameEvent = {
    gameEvent: GameEvent
}

const SnackbarGameEvent = forwardRef(({gameEvent}: SnackbarGameEvent, ref) => {
  const [open, setOpen] = useState(false);

    function getTypeAdvantageText(multiplicator: number): string {
        switch (multiplicator) {
            case 0.5:
                return "It was ineffective...";
            case 0.8:
                return "It was not very effective...";
            case 1.2 :
                return "It was effective!"
            case 1.5: 
                return "It was very effective!"
            default:
                return "";
        }
    }

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
    hide: () => setOpen(false),
  }));
  switch (gameEvent.eventType) {
    case "ATTACK":
        return (
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
              <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
                {/* {`${gameEvent.eventFrom} triggered ${gameEvent.eventType} on ${gameEvent.eventTarget}`}
                */}
                [{gameEvent.eventType}] : {gameEvent.eventFrom} attacked {gameEvent.eventTarget}. {getTypeAdvantageText(gameEvent.attackSuccess)} 
              </Alert>
            </Snackbar>
          );

    case "CRITICAL":
        return (
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
              <Alert onClose={() => setOpen(false)} sx={{ width: "100%", backgroundColor: "gold", color: "white" }}>
                [{gameEvent.eventType}] : {gameEvent.eventFrom} performed a critical hit onto {gameEvent.eventTarget}
              </Alert>
            </Snackbar>
          );
    case "DODGE":
        return (
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} sx={{ width: "100%",  backgroundColor: "magenta", color:"white"}}>
                [{gameEvent.eventType}] : {gameEvent.eventTarget} dodged {gameEvent.eventFrom}'s attack!'
                </Alert>
            </Snackbar>
            );
      }
});

export default SnackbarGameEvent;