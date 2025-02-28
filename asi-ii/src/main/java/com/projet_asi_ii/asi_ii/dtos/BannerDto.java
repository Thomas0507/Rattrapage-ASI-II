package com.projet_asi_ii.asi_ii.dtos;

import com.projet_asi_ii.asi_ii.entities.CardEntity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BannerDto {
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
    private List<CardDto> summonableCards;
    @OneToMany
    private List<CardDto> featuredCards;
}
