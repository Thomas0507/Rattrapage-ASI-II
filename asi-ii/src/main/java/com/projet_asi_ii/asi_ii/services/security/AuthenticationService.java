package com.projet_asi_ii.asi_ii.services.security;

import com.projet_asi_ii.asi_ii.requests.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	@Autowired
	private AuthenticationManager authenticationManager;

	public Authentication authenticate(UserRequest userRequest) {
		try {
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							userRequest.getUsername(),
							userRequest.getPassword()
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