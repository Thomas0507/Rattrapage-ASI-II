import { Button, Card, CardActions, CardContent, Container, Grid, Grid2, Typography } from '@mui/material';
import React from 'react'

import '../../css/SelectScreen.css';
import { Link } from 'react-router-dom';

// used to chose where to go
function SelectScreen () {
    return (
        <Grid2 container spacing={2} padding={"1em"}>
            {/* View */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Cards
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        {/* <Typography sx={{mb: 1.5 }}>View all cards that you can get</Typography> */}
                        <Typography variant="body2">
                            View all cards that you can get in this game.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/cards'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Buy */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Buy
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        {/* <Typography sx={{mb: 1.5 }}>View all cards that you can get</Typography> */}
                        <Typography variant="body2">
                            Buy cards directly.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/buy'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Sell */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Sell
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        {/* <Typography sx={{mb: 1.5 }}>View all cards that you can get</Typography> */}
                        <Typography variant="body2">
                            Sell cards.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/sell'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Game */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Game
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        {/* <Typography sx={{mb: 1.5 }}>View all cards that you can get</Typography> */}
                        <Typography variant="body2">
                            Play a game versus another player
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/game'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Generate Card */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Generate Card
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        {/* <Typography sx={{mb: 1.5 }}>View all cards that you can get</Typography> */}
                        <Typography variant="body2">
                            Generate a card
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/generate'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Summon cards */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Banners
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography variant="body2">
                            Get a random cards from one of our banners !
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/summon'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
            {/* Chat */}
            <Grid2 size={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom>
                            Chat
                        </Typography>
                        <Typography variant="h5" component="div">
                        </Typography>
                        <Typography variant="body2">
                            Chat with other connected users!
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={'/app/chat'}>Go</Button>
                    </CardActions>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default SelectScreen;