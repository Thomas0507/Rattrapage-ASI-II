package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.CollectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<CollectionEntity, Integer> {
    public CollectionEntity findByName(String name);
}
