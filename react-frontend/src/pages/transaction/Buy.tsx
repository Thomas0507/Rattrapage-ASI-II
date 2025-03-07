// src/pages/Buy.tsx

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardListComponent from "../../components/CardListComponent";
import { getOptionsByRequestType, RequestType } from '../../hooks/RequestBuilder';

function Buy() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8081/cards`, getOptionsByRequestType(RequestType.GET));
        if (!response.ok) {
          throw new Error(`Failed to fetch cards: ${response.statusText}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleBuy = (cardId: number) => {
    fetch("http://localhost:8081/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId,
        transactionType: "BUY",
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
        alert(`Transaction successful for card ${cardId}`);
      })
      .catch((err) => {
        console.error(err);
        alert(`Transaction failed: ${err.message}`);
      });
  };

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container component="main">
      <Box mt={4}>
        <Typography component="h1" variant="h5">
          BUY Cards
        </Typography>
        <CardListComponent cards={cards} actionLabel="Buy" onActionClick={handleBuy} />
      </Box>
    </Container>
  );
}

export default Buy;

