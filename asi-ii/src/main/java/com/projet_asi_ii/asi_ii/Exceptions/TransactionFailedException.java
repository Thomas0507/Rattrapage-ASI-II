package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class TransactionFailedException extends RuntimeException {
    private final String errorReason;

    public TransactionFailedException(String message) {
        super(message);
        this.errorReason = "Transaction failed";
    }

    public TransactionFailedException(String message, Throwable cause) {
        super(message, cause);
        this.errorReason = "Transaction failed due to an unexpected error";
    }

    public TransactionFailedException(String message, String errorReason) {
        super(message);
        this.errorReason = errorReason;
    }

    public TransactionFailedException(String message, String errorReason, Throwable cause) {
        super(message, cause);
        this.errorReason = errorReason;
    }

}
