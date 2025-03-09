package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class TransactionFailedException extends GenericException {

    public TransactionFailedException(String message, String errorReason) {
        super(message, errorReason);

    }
}
