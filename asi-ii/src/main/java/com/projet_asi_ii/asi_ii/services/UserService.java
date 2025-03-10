package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.mappers.UserMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import com.projet_asi_ii.asi_ii.repositories.UserRepository;
import com.projet_asi_ii.asi_ii.requests.UserRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService
{
	@Autowired
	private UserRepository appUserRepository;

	@Autowired
	private PlayerRepository playerRepository;

	@Autowired
	private CardRepository cardRepository;

	@Transactional
	public boolean insertUser(UserRequest userRequest) {
		UserEntity userEntity = new UserEntity();
		userEntity.setUsername(userRequest.getUsername());
		userEntity.setEmail(userRequest.getEmail());
		userEntity.setPassword(userRequest.getPassword());
		// Create a player Entity at the same time
		PlayerEntity playerEntity = new PlayerEntity();
		// Affect a basic card to the player
		try {
			userEntity = appUserRepository.save(userEntity);
			playerEntity.setUser(userEntity);
			playerEntity.setCards(List.of(cardRepository.findById((long)1).get()));
			playerEntity.setCash(5000);
			playerEntity.setBeginner(true);
			playerRepository.save(playerEntity);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
}
