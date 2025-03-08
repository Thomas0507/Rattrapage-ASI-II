import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import CardListComponent from '../../components/CardListComponent';
import { getOptionsByRequestType, RequestType } from '../../hooks/RequestBuilder';
import { Card } from '../../models/Card';
import { useAuth } from "../../hooks/useAuth"; 


const Buy: React.FC = () => {
  const { user } = useAuth();
  const [cards, setCards] = React.useState<Card[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false); 


  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const maxPageResponse = await fetch('http://localhost:8081/cards/getNbCards', getOptionsByRequestType(RequestType.GET));
        if (!maxPageResponse.ok) {
          throw new Error(`Error fetching number of cards: ${maxPageResponse.statusText}`);
        }
        const maxNbCards = await maxPageResponse.json();

        const response = await fetch(`http://localhost:8081/cards?page=0&size=${maxNbCards}`, getOptionsByRequestType(RequestType.GET));
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

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const handleBuy = async (cardId: number) => {
    if (!user) {
      alert("Veuillez vous connecter avant d'acheter.");
      return;
    }

    if (!user || typeof user !== "string") {
      alert("Erreur: Utilisateur non authentifié.");
      return;
    }

    const selectedCard = cards.find((card) => card.id === cardId);
    if (!selectedCard) {
      alert("Erreur: Carte introuvable.");
      return;
    }

    const price = selectedCard.price;
  
    const decodedToken = parseJwt(user);
    if (!decodedToken || !decodedToken.sub) {
      alert("Erreur: Token invalide. Veuillez vous reconnecter.");
      return;
    }

    setIsProcessing(true); 

    console.log("Username extracted from token:", decodedToken.sub);
    console.log("Authorization Header:", `Bearer ${user}`);

    try {
      const response = await fetch("http://localhost:8081/transaction", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user}`
        },
        body: JSON.stringify({
          cardId: cardId,
          amount: price, 
          transactionType: "BUY",
        }),
      });
  
      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg);
      }
  
      console.log("Transaction réussie !");
      alert(`Achat réussi pour la carte ${cardId}`);

      
    } catch (err: any) {
      console.error("Erreur lors de la transaction :", err);
      alert(`Transaction échouée: ${err.message}`);
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
