import React from "react";
import { Player } from "../models/Player";
import { Button, Container, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CardComponent from "./CardComponent";
import { Link } from "react-router-dom";
import "../css/ProfileComponent.css";
import { useSell } from "../hooks/useSell";

interface ProfileProps {
    player: Player;
}

const ProfileComponent = ({player}: ProfileProps) => {

    const { handleSell, handlePriceChange, prices } = useSell();
    
    console.log(player);
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
                    value={player.cash}
                    disabled
                />
                </FormControl>
                {/* my cards => todo */}
                <Typography variant="h4" className="center-text">
                    My cards
                </Typography>
                <Link to="/app/sell">
                    <Button variant="contained" color="primary">
                        Sell Your Cards
                    </Button>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1em', flexWrap: 'wrap' }}>
                {player.cards.length !== 0 ? (
                    player.cards.map((_card) => (
                        <div key={_card.id} style={{ textAlign: "center" }}>
                            <CardComponent card={_card} />
                            <TextField
                                label="Enter Price"
                                type="number"
                                variant="outlined"
                                sx={{ marginTop: 1, marginBottom: 1 }}
                                value={prices[_card.id] || ""}
                                onChange={(e) => handlePriceChange(_card.id, Number(e.target.value))}
                            />
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => handleSell(_card.id)} 
                                sx={{ marginTop: 1 }}
                            >
                                Sell
                            </Button>
                        </div>
                    ))
                ) : (
                    <Typography className="center-text">
                        You don't have any cards. Go to the market to generate or buy some!
                    </Typography>
                )}
            </div>
        </Container>

    );
  };



export default ProfileComponent;