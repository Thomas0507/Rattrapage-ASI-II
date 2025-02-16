package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<CardDto> getCards() {
        List<CardEntity> cards = this.cardRepository.findAll();
        List<CardDto> cardDtos = new ArrayList<>();
        for (CardEntity cardEntity : cards) {
            CardDto cardDto = CardMapper.INSTANCE.toCardDto(cardEntity);
            cardDtos.add(cardDto);
        }
        return cardDtos;
    }

}
