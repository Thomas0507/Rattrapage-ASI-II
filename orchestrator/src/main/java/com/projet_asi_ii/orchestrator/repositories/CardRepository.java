package com.projet_asi_ii.orchestrator.repositories;

import com.projet_asi_ii.orchestrator.entities.CardEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.UUID;

public interface CardRepository extends MongoRepository<CardEntity,String>
{
	Optional<CardEntity> findByCardId(UUID cardId);
}
