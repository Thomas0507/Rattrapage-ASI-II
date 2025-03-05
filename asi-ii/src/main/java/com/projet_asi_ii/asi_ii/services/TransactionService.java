package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.TransactionEntity;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.mappers.TransactionMapper;
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
            PlayerEntity player = playerRepository.findByUserUsername(transactionRequest.getUsername());
            if (player == null) {
                // todo : user not found
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
                    TransactionEntity transactionBuy = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                    transactionBuy.setUserEntity(player.getUser());
                    transactionBuy = transactionRepository.save(transactionBuy);

                    // Deduct from player's cash
                    player.setCash(player.getCash() - transactionBuy.getAmount());
                    playerRepository.save(player);

                    // Return DTO
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
                    throw new UnknownTransactionTypeException("Unknown transaction type: " + transactionRequest.getTransactionType());        }
            }
        } catch (UserNotFoundException | InsufficientCashException | UnknownTransactionTypeException e) {
            throw e;
        } catch (Exception e) {
            throw new TransactionFailedException("Failed to create transaction: " + e.getMessage(), e);
        }
}


