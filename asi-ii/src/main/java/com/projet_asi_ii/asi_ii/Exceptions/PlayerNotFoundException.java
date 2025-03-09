package com.projet_asi_ii.asi_ii.Exceptions;

public class PlayerNotFoundException extends GenericException{
    public PlayerNotFoundException(String message, String errorReason) {
        super(message, errorReason);
    }
}
