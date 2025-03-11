package com.projet_asi_ii.asi_ii.Exceptions;

public class UserAlreadyExistsException extends GenericException
{
	public UserAlreadyExistsException(String message, String errorReason) {
		super(message, errorReason);
	}
}
