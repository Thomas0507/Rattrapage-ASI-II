package com.projet_asi_ii.asi_ii.reponses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
	private String token;

	private long expiresIn;
}