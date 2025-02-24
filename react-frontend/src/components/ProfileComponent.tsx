import React from "react";
import { Player } from "../models/Player";
import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CardComponent from "./CardComponent";

interface ProfileProps {
    player: Player;
}

const ProfileComponent = ({player}: ProfileProps) => {
    return (
        <Container fixed>
            <div>
            <Typography variant="h3" className="center-text">
                    My Profile
                </Typography>
                <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="input-username">Username</InputLabel>
                    <OutlinedInput
                    id="input-username"
                    label="Username"
                    defaultValue={player.username}
                    disabled
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Cash</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Cash"
                    defaultValue={player.cash}
                    disabled
                />
                </FormControl>
                {/* my cards => todo */}
                <Typography variant="h4" className="center-text">
                    My cards
                </Typography>

                {
                    player.cards.map(
                        (_card, _index) => (
                            <CardComponent card ={_card}
                            />
                        )
                    )
                }

            </div>
        </Container>

    );
  };



export default ProfileComponent;