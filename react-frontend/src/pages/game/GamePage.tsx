import React, { useEffect, useState } from "react"
import { GameInviteComponent } from "../../components/GameInviteComponent"
import { Alert, Box, Button, Checkbox, Container, FormControlLabel, Modal, Snackbar, SnackbarOrigin, TextField, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from "@mui/material";
import StartIcon from '@mui/icons-material/Start';
import { getOptionsByRequestType, RequestType } from "../../hooks/RequestBuilder";
import ScrollableListComponent from "../../components/ScrollableListComponent";
import { GameSession } from "../../models/GameSession";
import ReplayIcon from '@mui/icons-material/Replay';
import InfoIcon from '@mui/icons-material/Info';
import { create } from "@mui/material/styles/createTransitions";


interface State extends SnackbarOrigin {
  open: boolean;
}

interface Uuidresponse extends Response {
    uuid: string;
}

interface gameSessionResponse {
    gameSessionArray: any[];
    errorResponse: {
        status: number;
        message: string;
        reason: string;
    }
}

type CreateRoomRequest = {
    roomName: string;
    roomDescription: string;
    capacity: number;
    autoJoin: boolean;
  };
type CreateRoomResponse = {
    uuid: string,
    errorResponse :{
        status: number;
        message: string;
        reason: string;
    }
}


export const GamePage = () => {


    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<boolean>(false);
    const [uuid, setUuid] = useState<string>("");
    const [joinDisabled, setJoinDisabled] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [openCreateRoomModal, setOpenCreateRoomModal] = useState<boolean>(false);

    const [roomsLoading, setRoomsLoading] = useState<boolean>(true);
    const [rooms, setRooms] = useState<any[]>([]);
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });

    const [loading, setLoading] = useState<boolean>(false);

    const { vertical, horizontal, open } = state;

    // Modal 
    const [formData, setFormData] = useState<CreateRoomRequest>({
        roomName: "",
        roomDescription: "",
        capacity: 2,
        autoJoin: true,
      }); 
    const [errors, setErrors] = useState<{ roomName?: string }>({});


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
        
    };

    const validateForm = () => {
        let newErrors: { roomName?: string } = {};
        if (!formData.roomName.trim()) {
          newErrors.roomName = "Room Name is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (formData: CreateRoomRequest) => {
        createRoomWithForm(formData);
    }
    const onClose = () => {
        setOpenCreateRoomModal(false);
    }

    //   snackbar
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
        }).finally(() => {
            setLoading(false);
        });       
    }

    const createRoomWithForm = async(formData: CreateRoomRequest) => {
        setLoading(true);
        console.log(formData);
        await fetch("http://localhost:3000/game/session", getOptionsByRequestType(RequestType.POST, formData)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then(text => {
                    setErrorMessage(text);
                    setState({...state, open: true});
                });
            }
            const uuidReponse: CreateRoomResponse = await response.json();
            if (formData.autoJoin) {
                window.location.href += "/session/" + uuidReponse.uuid;
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false);
        });
    }

    const fetchRoom = async() => {
        setLoading(true);
        setRoomsLoading(true);
        await fetch("http://localhost:3000/game/all",getOptionsByRequestType(RequestType.GET)).then(async (response: Response) => {
            if (!response.ok) {
                return response.text().then( text => {
                    setErrorMessage(text);
                    setState({...state, open: true});
                });
            }
            const gameSessionResponse: gameSessionResponse = await response.json();
            console.log(gameSessionResponse);
            setRooms(gameSessionResponse.gameSessionArray.filter(el => el.status === 'waiting'));
            // redirect to the created session =>            
        }).catch(err => {
            setErrorMessage("Error when creating a room");
            setState({...state, open: true});
        }).finally(() => {
            setLoading(false);
            setRoomsLoading(false);
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
        fetchRoom();
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

    const openModal = () => {
        setOpenCreateRoomModal(true);
    }


    return (
        <Container>
        <Box
        sx={{

            display: "flex",
            justifyContent: "center", // Center items horizontally
            flexDirection: "column",
            paddingTop: "3%",
            gap: "2em"
        }}
        >
        <Typography variant="h1" component="h2">Join a room or create your own</Typography>
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Typography variant="h6" component="h6">List of existing Room : </Typography>
            <Tooltip title="Refresh room list">
                <IconButton
                onClick={fetchRoom}
                >
                    <ReplayIcon
                    color="warning"
                    fontSize="large"
                    />                   
            </IconButton>
            </Tooltip>
        </div>
        <ScrollableListComponent loading={roomsLoading} items={rooms}/>

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
        <GameInviteComponent onChange={handleChange}/>
        </div>
        <Tooltip title={"Create a room"}>
            <Button
                type="button"
                variant="contained" // Flat button with background color
                color="primary" // Uses theme primary color
                onClick={openModal}>
                    Create a room
            </Button>
        </Tooltip>
              <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                message={errorMessage}
                key={vertical + horizontal}
                >
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>

        {/* modal */}
        <Modal open={openCreateRoomModal} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Create Room</Typography>
        <TextField
          required={true}
          label="Room Name"
          name="roomName"
          error={!!errors.roomName}
          helperText={errors.roomName}
          value={formData.roomName}
          onChange={handleFormChange}
          fullWidth
        />
        <TextField
          required={false}
          label="Room Description"
          name="roomDescription"
          value={formData.roomDescription}
          onChange={handleFormChange}
          fullWidth
          multiline
          rows={3}
        />
        <div style={{display: "flex", flexDirection: "row"}}>
        <TextField
          style={{flex: 1}}
          disabled={true}
          label="Capacity"
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleFormChange}
          fullWidth/>
        <Tooltip title="Capacity field is not yet supported">
            <IconButton>
                <InfoIcon
                color="primary"/>
            </IconButton>
        </Tooltip>
        </div>

        <Tooltip title="You will automatically join the room after its creation">
        <FormControlLabel
          control={
            <Checkbox
              name="autoJoin"
              checked={formData.autoJoin}
              onChange={handleFormChange}
            />
          }
          label="Auto Join"
        />
        </Tooltip>

        <Button variant="contained" onClick={handleSubmit}>
          Create Room
        </Button>
      </Box>
    </Modal>

        </Container>


    )
}
