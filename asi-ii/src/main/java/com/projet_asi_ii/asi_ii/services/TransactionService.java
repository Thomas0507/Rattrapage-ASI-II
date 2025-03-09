package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.Exceptions.*;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.TransactionEntity;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.mappers.TransactionMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import com.projet_asi_ii.asi_ii.repositories.TransactionRepository;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.smartcardio.CardNotPresentException;
import java.util.*;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    private CardRepository cardRepository;

    public List<TransactionDto> getTransactionByUsername(String username) {
        Collection<TransactionEntity> transactions = transactionRepository.findByUserEntityUsername(username);
        List<TransactionDto> transactionsDto = new ArrayList<>();
        for (TransactionEntity transaction : transactions) {
            transactionsDto.add(TransactionMapper.INSTANCE.toTransactionDto(transaction));
        }
        return transactionsDto;
    }

    public TransactionDto createTransaction(TransactionRequest transactionRequest) throws CardNotFoundException, UserNotFoundException, InsufficientCashException, UnknownTransactionTypeException {
            PlayerEntity player = playerRepository.findByUserUsername(transactionRequest.getUsername());
            if (player == null) {
                throw new UserNotFoundException("User not found: " + transactionRequest.getUsername());
            }
            List<CardEntity> cardsInDb = new ArrayList<>();

            switch (transactionRequest.getTransactionType()) {
                case BUY :
                    // Check for enough cash
                    if (player.getCash() - transactionRequest.getAmount() < 0) {
                        throw new InsufficientCashException("Insufficient cash for BUY transaction.");
                    }
                    transactionRequest.getCards().forEach(cardDto -> {
                        Optional<CardEntity> card = cardRepository.findById(cardDto.getId());
                        card.ifPresent(cardsInDb::add);
                    });
                    if (cardsInDb.isEmpty() || cardsInDb.size() != transactionRequest.getCards().size()) {
                        throw new CardNotFoundException("Card not found", "Received " + transactionRequest.getCards().size() + "cards but only " + cardsInDb.size() + " found for purchase.");
                    }
                    // transaction Request is OK
                    // Create empty transaction ->
                    TransactionEntity transactionBuy = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                    transactionBuy.setUserEntity(player.getUser());
                    transactionBuy.setType(transactionRequest.getTransactionType());

                    // modify player infos
                    player.setCash(player.getCash() - transactionBuy.getAmount());
                    player.getCards().addAll(cardsInDb);
                    playerRepository.save(player);

                    // save transaction
                    transactionBuy = transactionRepository.save(transactionBuy);
                    // Return DTO
                    return TransactionMapper.INSTANCE.toTransactionDto(transactionBuy);
                
                case SELL :

                    transactionRequest.getCards().forEach(cardDto -> {
                        Optional<CardEntity> card = cardRepository.findById(cardDto.getId());
                        card.ifPresent(cardsInDb::add);
                    });
                    if (cardsInDb.isEmpty() || cardsInDb.size() != transactionRequest.getCards().size()) {
                        throw new CardNotFoundException("Card not found", "Received " + transactionRequest.getCards().size() + "cards but only " + cardsInDb.size() + " found for purchase.");
                    }

                    TransactionEntity transactionSell = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                    transactionSell.setUserEntity(player.getUser());
                    transactionSell.setType(transactionRequest.getTransactionType());
                    transactionSell = transactionRepository.save(transactionSell);

                    // Increase player's cash - one card at a time
                    player.setCash(player.getCash() + transactionSell.getAmount());
                    player.getCards().removeAll(cardsInDb);
                    playerRepository.save(player);
                    
                    return TransactionMapper.INSTANCE.toTransactionDto(transactionSell);
                
                default:
                    throw new UnknownTransactionTypeException("Unknown transaction type: " + transactionRequest.getTransactionType());
            }
    }
}




