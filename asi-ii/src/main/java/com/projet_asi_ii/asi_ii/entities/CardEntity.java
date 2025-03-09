package com.projet_asi_ii.asi_ii.entities;

import com.projet_asi_ii.asi_ii.enumerations.CardTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "card")
public class CardEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1024)
    private String description;
    @Column(length = 1024)
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
    private int resellPrice;
    // up to 20s stars rating
    private int rarity;

    // DeckSet
    @ManyToOne(optional = false)
    @JoinColumn(name = "collection_entity_id", nullable = false, unique = true)
    private CollectionEntity collectionEntity;

}
