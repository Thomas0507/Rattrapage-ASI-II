package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.BannerDto;
import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.services.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("banner")
public class BannerController {

    @Autowired
    BannerService bannerService;

    @GetMapping
    public ResponseEntity<List<BannerDto>> getBanners() {
        return ResponseEntity.ok(this.bannerService.getAllBanners());
    }

    @GetMapping("/active")
    public ResponseEntity<List<BannerDto>> getActiveBanners() {
        return ResponseEntity.ok(this.bannerService.getAllActiveBanners());
    }

    @GetMapping("summon/{bannerId}")
    public ResponseEntity<List<CardDto>> summonOnABanner(@PathVariable(value = "bannerId") String bannerId) {
        long id;
        try {
            id = Long.parseLong(bannerId);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        if (this.bannerService.checkIfSummonIsLegal(user, id)) {
            return ResponseEntity.ok(this.bannerService.summon(id));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
