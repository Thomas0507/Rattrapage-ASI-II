// src/pages/Buy.tsx

import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// to be fixed
function Buy() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const amount = Number(formData.get("amount"));

    fetch("http://localhost:8081/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        amount,
        transactionType: "BUY", // difference
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create BUY transaction");
        }
        return response.json();
      })
      .then((data) => {
        console.log("BUY transaction created:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={4}>
        <Typography component="h1" variant="h5">
          BUY
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Submit BUY
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Buy;
