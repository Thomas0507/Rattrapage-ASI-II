package com.projet_asi_ii.asi_ii.dtos;

import com.projet_asi_ii.asi_ii.enumerations.TransactionTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TransactionDto {
    private Long id;
    private String username;
    private Set<CardDto> cards;
    private int amount;
    private TransactionTypeEnum type;
    private Date createdAt;
}
