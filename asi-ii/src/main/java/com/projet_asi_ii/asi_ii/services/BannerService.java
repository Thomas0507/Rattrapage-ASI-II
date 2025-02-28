package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.BannerDto;
import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.BannerEntity;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.mappers.BannerMapper;
import com.projet_asi_ii.asi_ii.repositories.BannerRepository;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    // summon is legal if:
    // - player has enough money,
    // - the banner is active,
    // - its endDate is <= to currentDate

    public boolean checkIfSummonIsLegal(UserEntity user, long bannerId) {
        PlayerEntity player = playerRepository.findByUserUsername(user.getUsername());
        BannerEntity banner = bannerRepository.findById(bannerId);
        if (Math.abs(player.getCash() - banner.getCost()) < 0) {
            return false;
        }
        if (!banner.getIsActive()) {
            return false;
        }
        return !banner.getEndDate().before(Date.from(Instant.now()));
    }

    public List<CardDto> summon(long id) {
        BannerEntity bannerEntity = this.bannerRepository.findById(id);
        List<CardDto> cardDtos = new ArrayList<>();
        return cardDtos;
    }
}
