package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.Exceptions.NoBuyableCardsFoundException;
import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    /*
    * Depreciated
    * */
    public List<CardDto> getCards() {
        List<CardEntity> cards = this.cardRepository.findAll();
        List<CardDto> cardDtos = new ArrayList<>();
        for (CardEntity cardEntity : cards) {
            CardDto cardDto = CardMapper.INSTANCE.toCardDto(cardEntity);
            cardDtos.add(cardDto);
        }
        return cardDtos;
    }
    @Transactional
    public boolean insertCards(List<CardDto> cards) {
        for(CardDto cardDto : cards) {
            CardEntity ce = CardMapper.INSTANCE.toCardEntity(cardDto);
            try {
                cardRepository.save(ce);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        return true;
    }

    public List<CardDto>getCardsWithRange(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<CardEntity> resultPage = this.cardRepository.findAll(pageable);
        List<CardDto> cardDtos = new ArrayList<>();
        resultPage.getContent().forEach(cardEntity ->
                cardDtos.add(CardMapper.INSTANCE.toCardDto(cardEntity)));
        return cardDtos;
    }

    public CardDto getCardById(long id) {
        Optional<CardEntity> cardEntity = this.cardRepository.findById(id);
        return cardEntity.map(CardMapper.INSTANCE::toCardDto).orElse(null);
    }

    public int getNbCards() {
        return Math.toIntExact(this.cardRepository.count());
    }

    public List<CardDto> getBuyableCards() throws NoBuyableCardsFoundException {
        List<CardEntity> cards = this.cardRepository.findAll();
        List<CardDto> cardDtos = new ArrayList<>();
        cards.forEach(cardEntity ->
        {
            if (cardEntity.getRarity() <= 6) {
                cardDtos.add(CardMapper.INSTANCE.toCardDto(cardEntity));
            }
        });
        if (cardDtos.size() == 0) {
            throw new NoBuyableCardsFoundException("No buyable cards found", "Come back later");
        }
        return cardDtos;
    }
}
