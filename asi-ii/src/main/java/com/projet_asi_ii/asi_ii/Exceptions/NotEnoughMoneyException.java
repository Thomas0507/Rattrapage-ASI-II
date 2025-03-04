package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotEnoughMoneyException extends GenericException {
    public NotEnoughMoneyException(String message, String errorReason) {
        super(message, errorReason);
    }
}
