package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotABeginnerException extends GenericException {
    public NotABeginnerException(String message, String errorReason) {
        super(message, errorReason);
    }
}
