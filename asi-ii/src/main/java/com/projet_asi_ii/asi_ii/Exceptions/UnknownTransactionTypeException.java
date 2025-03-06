package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class UnknownTransactionTypeException extends RuntimeException {
    private final String errorReason;

    public UnknownTransactionTypeException(String message) {
        super(message);
        this.errorReason = "Unknown transaction type";
    }

    public UnknownTransactionTypeException(String message, String errorReason) {
        super(message);
        this.errorReason = errorReason;
    }

}
