package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.User;
import com.projet_asi_ii.asi_ii.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	private final UserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;

	public AuthenticationService(UserRepository appUserRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
		this.appUserRepository = appUserRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
	}

	public User addUser(UserDto userDto) {
		User logUser = new User();
		logUser.setUsername(userDto.getUsername());
		logUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
		return appUserRepository.save(logUser);
	}

	public User authenticate(UserDto userDto) {
		try {
			authenticationManager.authenticate(
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

		return appUserRepository.findByUsername(userDto.getUsername())
				.orElse(null);
	}
}