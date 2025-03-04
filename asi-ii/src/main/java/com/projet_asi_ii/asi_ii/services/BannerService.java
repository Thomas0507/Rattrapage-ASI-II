package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.Exceptions.BadEndpointException;
import com.projet_asi_ii.asi_ii.Exceptions.BannerHasEndedException;
import com.projet_asi_ii.asi_ii.Exceptions.BannerNotActiveException;
import com.projet_asi_ii.asi_ii.Exceptions.NotABeginnerException;
import com.projet_asi_ii.asi_ii.dtos.BannerDto;
import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.BannerEntity;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.mappers.BannerMapper;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.repositories.BannerRepository;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired PlayerRepository playerRepository;

    public List<BannerDto> getAllBanners() {
        List<BannerEntity> bannerEntities = this.bannerRepository.findAll();
        return this.convertBannerEntitiesToBannerDto(bannerEntities);
    }

    public List<BannerDto> getAllActiveBanners() {
        List<BannerEntity> bannerEntities = this.bannerRepository.findByIsActive(true);
        return this.convertBannerEntitiesToBannerDto(bannerEntities);
    }


    private List<BannerDto> convertBannerEntitiesToBannerDto(List<BannerEntity> bannerEntities) {
        List<BannerDto> bannerDtos = new ArrayList<>();
        for (BannerEntity bannerEntity : bannerEntities) {
            bannerDtos.add(BannerMapper.INSTANCE.toDto(bannerEntity));
        }
        return bannerDtos;
    }


    public List<CardDto> summon(UserEntity user, long id) throws BadEndpointException, BannerNotActiveException, BannerHasEndedException,NotABeginnerException {
        BannerEntity banner = bannerRepository.findById(id);
        PlayerEntity player = playerRepository.findByUserUsername(user.getUsername());

        checkIfSummonIsLegal(player, banner);

        List<CardDto> cardDtos = new ArrayList<>();
        List<CardEntity> cardsDropped = this.getRandomCardsFromBanner(banner);
        // forbid player from using free summon multiple time
        if (banner.getId() == 1) {
            player.setBeginner(false);
        }
        this.addCardsDroppedToPlayer(player, cardsDropped);

        for (CardEntity cardEntity : cardsDropped) {
            cardDtos.add(CardMapper.INSTANCE.toCardDto(cardEntity));
        }

        return cardDtos;
    }


    private void checkIfSummonIsLegal(PlayerEntity player, BannerEntity banner) throws BadEndpointException, NotABeginnerException, BannerNotActiveException, BannerHasEndedException {
        // summon is legal if:
        // - player has enough money,
        // - the banner is active,
        // - its endDate is <= to currentDate
        // The player already summoned on the free portal
        if (player.getCash() - banner.getCost() < 0) {
            throw new BannerNotActiveException("401", "Summon is forbidden", "You don't have enough cash");
        }
        if (!banner.getIsActive()) {
            throw new BannerNotActiveException("401", "Summon is forbidden", "This banner is no longer active");
        }
        if (banner.getId() == 1 && !player.isBeginner()) {
            throw new NotABeginnerException("401", "Summon is forbidden", "This player already used his free summon");
        }
        if (banner.getEndDate().before(Date.from(Instant.now()))) {
            throw new BannerHasEndedException("401", "Summon is forbidden", "This banner has already ended");
        };
    }

    private List<CardEntity> getRandomCardsFromBanner(BannerEntity banner) {
        List<CardEntity> summonableCards = banner.getSummonableCards();
        List<CardEntity> cardsFeatured = banner.getFeaturedCards();
        List<CardEntity> cardsDropped = new ArrayList<>();

        int cardToDrop = 5;

        if (banner.getGuaranteedSSR())  {
            int randomIndex = this.getRandomNumber(0, cardsFeatured.size());
            cardsDropped.add(cardsFeatured.get(randomIndex));
            cardToDrop = 4;
        }
        for (int i = 0; i < cardToDrop; i++) {
            int chance = getRandomNumber(0, 100);
            if ((float) chance < banner.getFeaturedDropRate()) {
                // dropped a featured card, they all have an equal chance of being dropped
                int indexOfFeaturedCard = getRandomNumber(0, cardsFeatured.size());
                cardsDropped.add(cardsFeatured.get(indexOfFeaturedCard));
            } else {
                // dropped a normal card, they all have an equal chance of being dropped
                int indexOfSummonableCard = getRandomNumber(0, summonableCards.size());
                cardsDropped.add(summonableCards.get(indexOfSummonableCard));
            }
        }
        return cardsDropped;
    }

    private int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    private void addCardsDroppedToPlayer(PlayerEntity player, List<CardEntity> cardsDropped) {
        player.setCards(Stream.concat(cardsDropped.stream(), player.getCards().stream()).collect(Collectors.toList()));
        playerRepository.save(player);
    }
}
