package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.TransactionEntity;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper(uses = CardMapper.class)
public interface TransactionMapper
{
    TransactionMapper INSTANCE = Mappers.getMapper( TransactionMapper.class );

    @Mapping(target = "username", expression = "java(transactionEntity.getUserEntity().getUsername())")
    TransactionDto toTransactionDto(TransactionEntity transactionEntity);

    TransactionEntity toTransactionEntity(TransactionDto transactionDto);

    @Mapping(target="userEntity", ignore = true)
    TransactionEntity toTransactionEntityFromRequest(TransactionRequest transactionRequest);
}
