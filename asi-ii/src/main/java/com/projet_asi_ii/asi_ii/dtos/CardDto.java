package com.projet_asi_ii.asi_ii.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardDto
{
    private Long id;
    private String name;
    private String description;
    private String image;
    private int attack;
    private int defense;
    private String type;
}
