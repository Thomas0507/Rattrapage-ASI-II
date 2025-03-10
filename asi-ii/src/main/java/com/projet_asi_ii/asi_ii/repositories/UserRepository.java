package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<UserEntity, Integer>
{
	Optional<UserEntity> findByUsername(String username);
}