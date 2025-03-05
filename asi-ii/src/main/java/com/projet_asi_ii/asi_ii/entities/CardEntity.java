package com.projet_asi_ii.asi_ii.entities;

import com.projet_asi_ii.asi_ii.enumerations.CardTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "card")
public class CardEntity {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    private Long id;
    private String name;
    private String description;
    private String image;
    private int attack;
    private int defense;
    private int health;
    @Enumerated(EnumType.STRING)
    private CardTypeEnum mainType;
    @Enumerated(EnumType.STRING)
    private CardTypeEnum secondaryType;
    private float dropRate;
    private int price;

    // up to 20s stars rating
    private int rarity;

    // DeckSet
    @ManyToOne(optional = false)
    @JoinColumn(name = "collection_entity_id", nullable = false, unique = true)
    private CollectionEntity collectionEntity;

}
