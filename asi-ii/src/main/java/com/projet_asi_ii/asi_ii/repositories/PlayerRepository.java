package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<PlayerEntity, Integer> {

    public PlayerEntity findByUserUsername(String username);
}
