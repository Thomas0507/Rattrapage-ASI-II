package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class NoBuyableCardsFoundException extends GenericException {

    public NoBuyableCardsFoundException(String message, String errorReason) {
        super(message, errorReason);
    }
}
