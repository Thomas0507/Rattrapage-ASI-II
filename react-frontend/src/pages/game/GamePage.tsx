import React, { useEffect, useState } from "react"
import { GameInviteComponent } from "../../components/GameInviteComponent"
import { Alert, Box, Button, Container, Snackbar, SnackbarOrigin, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from "@mui/material";
import StartIcon from '@mui/icons-material/Start';
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";


interface State extends SnackbarOrigin {
  open: boolean;
}

interface Uuidresponse extends Response {
    uuid: string;
}


export const GamePage = () => {


    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<boolean>(false);
    const [uuid, setUuid] = useState<string>("");
    const [joinDisabled, setJoinDisabled] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
  

    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({
            open: false,
            vertical: 'top',
            horizontal: 'center'
        });
        setErrorMessage("");
    }

    const handleJoin = () => {
        if (!joinDisabled) {
            window.location.href += "/session/" + uuid;  
        }
    }

    const handleChange = (uuid: string) => {
        setUuid(uuid);
    }

    const createRoom = async() => {
        await fetch("http://localhost:3000/game/session",getOptionsByRequestType(RequestType.GET)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then( text => {
                    setErrorMessage(text);
                    setState({...state, open: true});
                });
            }
            const uuidObjectResponse: Uuidresponse = await response.json();
            // redirect to the created session => 
            window.location.href += "/session/" + uuidObjectResponse.uuid;
            
        }).catch(err => {
            setErrorMessage("Error when creating a room");
            setState({...state, open: true});
            console.log(err);
        }).finally(() => {
            console.log("end")
        });
        
        
    }

    function getIconButton(): any {
        if (!joinDisabled) {
            return {
                backgroundColor: "primary.main", // Primary background
                color: "white", // Icon color
                boxShadow: "none", // Removes shadow
                    "&:hover": { backgroundColor: "primary.dark" },
                borderRadius: "4px"
            }
        } else {
            return {
                backgroundColor: "lightgrey",
                color: "primary",
                boxShadow: "none", // Removes shadow
                "&:hover": { backgroundColor: "lightgrey" },
                borderRadius: "4px"
            }
        }
    }

    function getJoinTooltip(): string {
        return joinDisabled ? "UUID must be filled before joining" : "Join a room"
    }

    useEffect(() => {
        if (uuid && uuid.length !== 0) {
            console.log(uuid);
            setJoinDisabled(false)
        } else {
            setJoinDisabled(true);
        }

    }, [uuid]);

    function getColorStartIconStyle() {
        if (joinDisabled) {
            return {
                color: "grey",
            };
        } else {
            return {
                color: "white",
            };
        }
    }
    return (
    <Box
      sx={{
        height: "100vh", // Full height of the screen
        display: "flex",
        alignItems: "center", // Center items vertically
        justifyContent: "center", // Center items horizontally
        flexDirection: "column",
        gap: "2em"
      }}
    >
        <Typography variant="h1" component="h2">Join a room or create your own</Typography>
        <div style={{display: "flex",  flexDirection: "row-reverse", gap: "1.5em"}}>
        <Tooltip title={getJoinTooltip()}>
            <IconButton
                sx = {getIconButton()}
                onClick={handleJoin}
                >
                <StartIcon style = {
                    getColorStartIconStyle()
                    
                }
            />
            </IconButton>
        </Tooltip>
        {/* <Tooltip title="Copy">
            <IconButton 
                onClick={handleCopy}>
                <ContentCopyIcon/>
            </IconButton>
        </Tooltip> */}
        <GameInviteComponent onChange={handleChange}/>
        </div>
        <Tooltip title={"Create a room"}>
            <Button
                type="button"
                variant="contained" // Flat button with background color
                color="primary" // Uses theme primary color
                onClick={createRoom}>
                    Create a room
                </Button>
        </Tooltip>
              <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message={errorMessage}
                key={vertical + horizontal}
                ><Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
    </Box>

    )
}
