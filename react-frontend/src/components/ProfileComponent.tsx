import React from "react";
import { Player } from "../models/Player";
import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CardComponent from "./CardComponent";

import "../css/ProfileComponent.css";


interface ProfileProps {
    player: Player;
}

const ProfileComponent = ({player}: ProfileProps) => {
    return (
        <Container fixed className="component-wrapper">
            <Typography variant="h3" className="center-text">
                    My Profile
                </Typography>
                <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="input-username">Username</InputLabel>
                    <OutlinedInput
                    id="input-username"
                    label="Username"
                    disabled
                    value={player.username}
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

                {player.cards.length !== 0 ?
                    
                    player.cards.map(
                        (_card, _index) => (
                            <Container fixed className="card-wrapper">
                                <CardComponent card ={_card}
                                />
                            </Container>
                        )
                    )
                :
                    <Typography className="center-text">You don't have any cards. Go to the market to generate or buy some!</Typography>
                }
        </Container>

    );
  };



export default ProfileComponent;