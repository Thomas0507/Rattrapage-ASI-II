package com.projet_asi_ii.asi_ii.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {

    private long id;
    private String username;
    private Set<CardDto> cards;

}
