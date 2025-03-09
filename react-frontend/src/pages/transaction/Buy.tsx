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

interface SimplifiedPlayer {
  username: string;
  cash: number;
}

const Buy: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false); 

  const [userCash, setUserCash] = useState<number>(0);

  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [validationOpen, setValidationOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8081/cards/buyableCards`, getOptionsByRequestType(RequestType.GET));
        if (!response.ok) {
          return response.text().then( text => {
            setError(true);
            setErrorMessage(text);
          });
        }
        const data = await response.json();
        setCards(data);
        // get UserCash
        fetchSimplifiedPlayerinfo();
      } catch (err: any) {
        setErrorOpen(true);
        // setError(true);
        // setErrorMessage(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);


  async function fetchSimplifiedPlayerinfo() {
    const userCashResponse: Response = await fetch('http://localhost:8081/player/cash', getOptionsByRequestType(RequestType.GET));
    if(!userCashResponse.ok) {
      return userCashResponse.text().then( text => {
        setError(true);
        setErrorMessage(text);
      })
    }
    const player: SimplifiedPlayer = await userCashResponse.json();
    setUserCash(player.cash);
  }


  const handleBuy = async (card: Card) => {
    setIsProcessing(true);
      // setLoading(true);
      await fetch("http://localhost:8081/transaction", getOptionsByRequestType(RequestType.POST, {
        cards: [CardModelToCardDto(card)],
        amount: card.price, 
        transactionType: "BUY",
      })).then(response => {
        if (!response.ok) {
          return response.text().then( text => {
            // setError(true);
            setErrorMessage(text);
            setErrorOpen(true);
          });
      }
      // transaction OK
      fetchSimplifiedPlayerinfo();
      setValidationOpen(true);
      
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
          Buy Cards \ You have <span>{userCash} $</span>
        </Typography>
        <CardListComponent
          cards={cards}
          actionLabel="Buy"
          onActionClick={handleBuy}
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

export default Buy;
