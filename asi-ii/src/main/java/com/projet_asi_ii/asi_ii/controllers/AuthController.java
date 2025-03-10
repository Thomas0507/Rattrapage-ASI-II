package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.Exceptions.UserAlreadyExistsException;
import com.projet_asi_ii.asi_ii.requests.UserRequest;
import com.projet_asi_ii.asi_ii.reponses.LoginResponse;
import com.projet_asi_ii.asi_ii.services.security.AuthenticationService;
import com.projet_asi_ii.asi_ii.services.UserService;
import com.projet_asi_ii.asi_ii.services.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private UserService userService;

	private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

	private SecurityContextRepository securityContextRepository =
			new HttpSessionSecurityContextRepository();

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody UserRequest userRequest, HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		Authentication authenticatedUser = authenticationService.authenticate(userRequest);

		SecurityContext context = securityContextHolderStrategy.createEmptyContext();
		context.setAuthentication(authenticatedUser);
		securityContextHolderStrategy.setContext(context);
		securityContextRepository.saveContext(context, request, response);

		String jwtToken = jwtService.generateToken((UserDetails) authenticatedUser.getPrincipal());
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());
		return ResponseEntity.ok(loginResponse);
	}

	@PostMapping("/signup")
	public ResponseEntity<UserRequest> signup(@RequestBody UserRequest userRequest) throws UserAlreadyExistsException {
		userRequest.setPassword(passwordEncoder.encode(userRequest.getPassword()));
		boolean res = userService.insertUser(userRequest);
		if (!res)
		{
			ResponseEntity.badRequest();
		}

		return ResponseEntity.ok().build();
	}
}