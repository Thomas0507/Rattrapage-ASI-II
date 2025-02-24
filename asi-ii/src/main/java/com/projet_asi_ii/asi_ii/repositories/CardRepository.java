package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.CardEntity;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardEntity, Long> {
}
