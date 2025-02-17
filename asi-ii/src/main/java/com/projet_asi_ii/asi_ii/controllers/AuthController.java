package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.User;
import com.projet_asi_ii.asi_ii.reponses.LoginResponse;
import com.projet_asi_ii.asi_ii.services.AuthenticationService;
import com.projet_asi_ii.asi_ii.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {

	@Value("${security.jwt.secret-key}")
	private String secretKey;

	@Value("${security.jwt.expiration-time}")
	private long jwtExpirationTime;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody UserDto userDto) {
		User authenticatedUser = authenticationService.authenticate(userDto);

		if (authenticatedUser == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		String jwtToken = jwtService.generateToken(authenticatedUser);
		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());
		return ResponseEntity.ok(loginResponse);
	}

	@PostMapping("/signup")
	public ResponseEntity<User> signup(@RequestBody UserDto userDto) {
		User user = authenticationService.addUser(userDto);
		if (user == null)
		{
			ResponseEntity.badRequest();
		}

		return ResponseEntity.ok().build();
	}
}