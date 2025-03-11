package com.projet_asi_ii.logger.repositories;

import com.projet_asi_ii.logger.entities.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Long>
{
}