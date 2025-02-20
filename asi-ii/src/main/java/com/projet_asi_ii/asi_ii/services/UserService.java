package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.mappers.UserMapper;
import com.projet_asi_ii.asi_ii.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
	@Autowired
	private UserRepository appUserRepository;

	@Transactional
	public boolean insertUser(UserDto userDto) {
		UserEntity userEntity = UserMapper.INSTANCE.toUserEntity(userDto);
		try {
			appUserRepository.save(userEntity);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
}
