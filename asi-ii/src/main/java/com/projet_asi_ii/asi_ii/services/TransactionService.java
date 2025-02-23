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
        PlayerEntity player = playerRepository.findByUserUsername(transactionRequest.getUsername());
        if (player == null) {
            // todo : user not found
            return null;
        }
        switch (transactionRequest.getTransactionType()) {
            case BUY :
                if (player.getCash() - transactionRequest.getAmount() < 0) {
                    return null;
                }
                TransactionEntity transactionBuy = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                transactionBuy.setUserEntity(player.getUser());
                transactionBuy = transactionRepository.save(transactionBuy);
                player.setCash(player.getCash() - transactionBuy.getAmount());
                playerRepository.save(player);
                return TransactionMapper.INSTANCE.toTransactionDto(transactionBuy);
            case SELL :
                TransactionEntity transactionSell = TransactionMapper.INSTANCE.toTransactionEntityFromRequest(transactionRequest);
                transactionSell.setUserEntity(player.getUser());
                transactionSell = transactionRepository.save(transactionSell);
                player.setCash(player.getCash() + transactionSell.getAmount());
                playerRepository.save(player);
                return TransactionMapper.INSTANCE.toTransactionDto(transactionSell);
            default:
                return null;
        }
    }
}
