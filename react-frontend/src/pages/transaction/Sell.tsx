import React, { useState } from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import { useProfile } from "../../pages/profile/ProfilePage";
import { useAuth } from "../../hooks/useAuth"; 
import CardComponent from "../../components/CardComponent"; 
import { useSell } from "../../hooks/useSell";

const Sell: React.FC = () => {
    const { player, setPlayer } = useProfile(); // Accès aux cartes du joueur
    const { handleSell, handlePriceChange, prices } = useSell();


    return (
        <Container>
            <Typography variant="h4">Sell Your Cards</Typography>
            <div style={{ display: 'flex', gap: '1em', flexWrap: 'wrap' }}>
                {player.cards.length > 0 ? (
                    player.cards.map((_card) => (
                        <Box key={_card.id} sx={{ textAlign: "center", padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
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
                        </Box>
                    ))
                ) : (
                    <Typography>You have no cards to sell.</Typography>
                )}
            </div>
        </Container>
    );
};

export default Sell;
