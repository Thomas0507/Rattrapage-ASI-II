package com.projet_asi_ii.asi_ii.configurations;

import com.projet_asi_ii.asi_ii.dtos.ErrorDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler
{
	@ExceptionHandler(MalformedJwtException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processMalformedJwtException(MalformedJwtException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), "Invalid token");
	}

	@ExceptionHandler(ExpiredJwtException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processExpiredJwtException(ExpiredJwtException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), "The token has expired");
	}

	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processAuthenticationException(AuthenticationException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
	}
}
