package com.projet_asi_ii.asi_ii.configurations;

import com.projet_asi_ii.asi_ii.Exceptions.*;
import com.projet_asi_ii.asi_ii.dtos.ErrorDto;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
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
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), "The token is invalid");
	}

	@ExceptionHandler(ExpiredJwtException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processExpiredJwtException(ExpiredJwtException e) {

		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), "The token has expired");
	}

	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processAuthenticationException(AuthenticationException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), "Invalid credentials");

	}
	@ExceptionHandler(BadEndpointException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processIllegalSummon(BadEndpointException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(BannerNotActiveException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processBannerNotActive(BannerNotActiveException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(NotEnoughMoneyException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processNotEnough(NotEnoughMoneyException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(BannerHasEndedException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processBannerHasEnded(BannerHasEndedException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(NotABeginnerException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ErrorDto processPlayerIsNotABeginner(NotABeginnerException e) {
		return new ErrorDto(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(NotBannerFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorDto processNoBannerFound(NotBannerFoundException e) {
		return new ErrorDto(HttpStatus.NOT_FOUND.value(), e.getMessage(), e.getErrorReason());
	}


	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorDto processUserNotFound(UserNotFoundException e) {
		return new ErrorDto(HttpStatus.NOT_FOUND.value(), e.getMessage(), e.getErrorReason());
	}
	
	@ExceptionHandler(InsufficientCashException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorDto processInsufficientCash(InsufficientCashException e) {
		return new ErrorDto(HttpStatus.BAD_REQUEST.value(), e.getMessage(), e.getErrorReason());
	}
	
	@ExceptionHandler(UnknownTransactionTypeException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorDto processUnknownTransactionType(UnknownTransactionTypeException e) {
		return new ErrorDto(HttpStatus.BAD_REQUEST.value(), e.getMessage(), e.getErrorReason());
	}
	
	@ExceptionHandler(TransactionFailedException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorDto processTransactionFailed(TransactionFailedException e) {
		return new ErrorDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(CardNotFoundException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorDto processCardTransactionNotFound(CardNotFoundException e) {
		return new ErrorDto(HttpStatus.BAD_REQUEST.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(PlayerNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorDto processPlayerNotFound(PlayerNotFoundException e) {
		return new ErrorDto(HttpStatus.NOT_FOUND.value(), e.getMessage(), e.getErrorReason());
	}

	@ExceptionHandler(NoBuyableCardsFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorDto processNoBuyableCardsFound(NoBuyableCardsFoundException e) {
		return new ErrorDto(HttpStatus.NOT_FOUND.value(), e.getMessage(), e.getErrorReason());
	}
}
