import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import CardListComponent from '../../components/CardListComponent';
import { getOptionsByRequestType, RequestType } from '../../hooks/RequestBuilder';
import { Card } from '../../models/Card';
import { useAuth } from "../../hooks/useAuth"; 
import ErrorComponent from '../../components/ErrorComponent';
import Loader from '../Loader';
import SnackbarError from '../../components/ErrorSnackbar';
import { CardModelToCardDto } from '../../models/mapper/CardMapper';
import SnackbarValidation from '../../components/SnackbarValidation';
import { Player } from '../../models/Player';

interface SimplifiedPlayer {
  username: string;
  cash: number;
}

const Sell: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false); 

  const [userCash, setUserCash] = useState<number>(0);

  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [validationOpen, setValidationOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchPlayerInfo();
  }, []);

  const fetchPlayerInfo = async () => {
    try {
        const response = await fetch(`http://localhost:8081/player`, getOptionsByRequestType(RequestType.GET, {}) )
        if (!response.ok) {
            throw new Error(`Error: $(response.statusText)`);
        }
        const result: Player = await response.json();
        setCards(result.cards);
        setUserCash(result.cash);
    } catch(err) {
        setError(err.message)
    } finally {
        setLoading(false);
    }
};




  const handleSell = async (card: Card) => {
    setIsProcessing(true);
      // setLoading(true);
      await fetch("http://localhost:8081/transaction", getOptionsByRequestType(RequestType.POST, {
        cards: [CardModelToCardDto(card)],
        amount: card.resellPrice, 
        transactionType: "SELL",
      })).then(response => {
        if (!response.ok) {
          return response.text().then( text => {
            // setError(true);
            setErrorMessage(text);
            setErrorOpen(true);
          });
      }
      // transaction OK
      setValidationOpen(true);
      fetchPlayerInfo();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsProcessing(false);
      });  
  };
  

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <ErrorComponent message={errorMessage}/>;
  }

  return (
    <div>
      <Container component="main" sx={{marginTop:"2em", maxWidth: '1600px!important'}}>
        <Typography variant="h4" gutterBottom sx={{
          position: "sticky", 
          top: 0,
          backgroundColor: "white"
        }}>
          Sell Cards \ You have <span>{userCash} $</span>
        </Typography>
        <CardListComponent
          cards={cards}
          actionLabel="Sell"
          onActionClick={handleSell}
          disabled={isProcessing}
        />
      <SnackbarError
        open={errorOpen}
        setOpen={setErrorOpen}
        message={errorMessage}
      />
      <SnackbarValidation
        open={validationOpen}
        setOpen={setValidationOpen}
        message={"Transaction done!"}
      />
      </Container>
    </div>
  );
};

export default Sell;
