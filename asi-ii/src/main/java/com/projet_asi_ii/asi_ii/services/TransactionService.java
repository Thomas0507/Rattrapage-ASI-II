package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.Exceptions.InsufficientCashException;
import com.projet_asi_ii.asi_ii.Exceptions.TransactionFailedException;
import com.projet_asi_ii.asi_ii.Exceptions.UnknownTransactionTypeException;
import com.projet_asi_ii.asi_ii.Exceptions.UserNotFoundException;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.TransactionEntity;
import com.projet_asi_ii.asi_ii.mappers.TransactionMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import com.projet_asi_ii.asi_ii.repositories.TransactionRepository;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    PlayerRepository playerRepository;

    public List<TransactionDto> getTransactionByUsername(String username) {
        Collection<TransactionEntity> transactions = transactionRepository.findByUserEntityUsername(username);
        List<TransactionDto> transactionsDto = new ArrayList<>();
        for (TransactionEntity transaction : transactions) {
            transactionsDto.add(TransactionMapper.INSTANCE.toTransactionDto(transaction));
        }
        return transactionsDto;
    }

    public TransactionDto createTransaction(TransactionRequest transactionRequest) {
        try {

            // Vérifier que `username` est bien rempli (éviter null)
            if (transactionRequest.getUsername() == null || transactionRequest.getUsername().isEmpty()) {
                throw new IllegalArgumentException("Username is required");
            }

            System.out.println("Username from JWT: " + transactionRequest.getUsername());

            // Récupérer le premier ID de carte de l'ensemble
            Long cardId = transactionRequest.getCards().iterator().next().getId();

            PlayerEntity player = playerRepository.findByUserUsername(transactionRequest.getUsername());
            if (player == null) {
                throw new UserNotFoundException("User not found: " + transactionRequest.getUsername());
                //return null;
            }
            switch (transactionRequest.getTransactionType()) {
                case BUY :
                    // Check for enough cash
                    if (player.getCash() - transactionRequest.getAmount() < 0) {
                        throw new InsufficientCashException("Insufficient cash for BUY transaction.");
                        //return null;
                    }

                    Optional<CardEntity> optionalCard = cardRepository.findById(cardId);
                    if (optionalCard.isEmpty()) {
                        throw new IllegalArgumentException("Card not found with id: " + cardId);
                    }
                    CardEntity boughtCard = optionalCard.get();

                    // Ajouter la carte à la liste du joueur
                    if (!player.getCards().contains(boughtCard)) {
                        player.getCards().add(boughtCard);
                    }

                    // Mettre à jour l'argent du joueur
                    player.setCash(player.getCash() - transactionRequest.getAmount());

                    // Sauvegarder le joueur avec la carte ajoutée
                    playerRepository.save(player);

                    // Créer et sauvegarder la transaction
                    TransactionEntity transactionBuy = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                    transactionBuy.setUserEntity(player.getUser());
                    transactionBuy = transactionRepository.save(transactionBuy);

                    return TransactionMapper.INSTANCE.toTransactionDto(transactionBuy);
                
                case SELL :
                    TransactionEntity transactionSell = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                    transactionSell.setUserEntity(player.getUser());
                    transactionSell = transactionRepository.save(transactionSell);

                    // Increase player's cash
                    player.setCash(player.getCash() + transactionSell.getAmount());
                    playerRepository.save(player);
                    
                    return TransactionMapper.INSTANCE.toTransactionDto(transactionSell);
                
                default:
                    throw new UnknownTransactionTypeException("Unknown transaction type: " + transactionRequest.getTransactionType());
               
            } // end switch
        } catch (UserNotFoundException | InsufficientCashException | UnknownTransactionTypeException e) {
            throw e;
        } catch (Exception e) {
            throw new TransactionFailedException("Failed to create transaction: " + e.getMessage(), e);

        }
    }
}


