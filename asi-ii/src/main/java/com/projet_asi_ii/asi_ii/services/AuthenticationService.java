package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.User;
import com.projet_asi_ii.asi_ii.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	@Autowired
	private UserRepository appUserRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	public User addUser(UserDto userDto) {
		User logUser = new User();
		logUser.setUsername(userDto.getUsername());
		logUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
		return appUserRepository.save(logUser);
	}

	public Authentication authenticate(UserDto userDto) {
		try {
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							userDto.getUsername(),
							userDto.getPassword()
					)
			);
		}
		catch (AuthenticationException e)
		{
			System.out.println("Authentication failed: " + e.getMessage());
		}

		return null;
	}
}