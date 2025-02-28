package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.BannerDto;
import com.projet_asi_ii.asi_ii.entities.BannerEntity;
import com.projet_asi_ii.asi_ii.mappers.BannerMapper;
import com.projet_asi_ii.asi_ii.repositories.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BannerService {

    @Autowired
    private BannerRepository bannerRepository;

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
}
