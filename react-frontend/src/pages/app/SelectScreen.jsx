import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SelectScreen = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    gap: 4
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Select an Option
                </Typography>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    onClick={() => handleNavigation('/app/cards')}
                >
                    Cards
                </Button>
                
                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    size="large"
                    onClick={() => handleNavigation('/app/conversation')}
                >
                    Conversation
                </Button>
                
                <Button 
                    variant="contained" 
                    color="success" 
                    fullWidth 
                    size="large"
                    onClick={() => handleNavigation('/app/game')}
                >
                    Game
                </Button>
            </Box>
        </Container>
    );
};

export default SelectScreen;