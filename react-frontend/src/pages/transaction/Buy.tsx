import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import CardListComponent from '../../components/CardListComponent';
import { getOptionsByRequestType, RequestType } from '../../hooks/RequestBuilder';
import { Card } from '../../models/Card';
import { useAuth } from '../../hooks/useAuth';



const Buy: React.FC = () => {
  const [cards, setCards] = React.useState<Card[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const { user } = useAuth();

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8081/cards', getOptionsByRequestType(RequestType.GET));
        if (!response.ok) {
          throw new Error(`Error fetching cards: ${response.statusText}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const handleBuy = async (cardId: number) => {
    const selectedCard = cards.find(card => card.id === cardId);
    if (!selectedCard) {
      alert("Card not found!");
      return;
    }
    try {
      const response = await fetch("http://localhost:8081/transaction", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user}` 
        },
        body: JSON.stringify({ 
          username: user.username,          // utilisateur connecté
          amount: selectedCard.price,       // prix venant de CardEntity
          cardId: selectedCard.id, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create BUY transaction");
      }

      const result = await response.json();
      console.log("BUY transaction created:", result);
      alert(`Successfully bought card with ID: ${cardId}`);
    } catch (err: any) {
      console.error(err);
      alert(`Transaction failed: ${err.message}`);
    }
  };

  if (loading) {
    return <p>Loading cards...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Container component="main">
        <Typography variant="h4" gutterBottom>
          BUY Cards
        </Typography>
        <CardListComponent
          cards={cards}
          actionLabel="Buy"
          onActionClick={handleBuy}
        />
      </Container>
    </div>
  );
};

export default Buy;
