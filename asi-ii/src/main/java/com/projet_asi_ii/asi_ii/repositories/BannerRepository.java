package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.BannerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<BannerEntity, Integer> {
    public List<BannerEntity> findByIsActive(Boolean isActive);

    BannerEntity findById(long bannerId);
}
