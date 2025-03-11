import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue sur notre site !
          </Typography>
          <Typography variant="h5" gutterBottom>
            Nous sommes ravis de vous avoir ici.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, px: 4, borderRadius: 3, bgcolor: "white", color: "black", '&:hover': { bgcolor: "grey.300" } }}
            onClick={handleClick}
            >
            Commencer
          </Button>
        </Box>
      </Container>
    );
  };

export default Home;