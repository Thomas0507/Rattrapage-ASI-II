package com.projet_asi_ii.asi_ii.entities;

import com.projet_asi_ii.asi_ii.enumerations.CardTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "banner")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BannerEntity {
    @Id
    @GeneratedValue(
            strategy= GenerationType.AUTO,
            generator="native"
    )
    private Long id;
    private String title;
    private String description;
    private int cost;
    private Boolean guaranteedSSR;
    private Date startDate;
    private Date endDate;
    private Boolean isActive;
    private String imageUrl;
    @OneToMany
    private List<CardEntity> summonableCards;
    @OneToMany
    private List<CardEntity> featuredCards;

}
