package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class UserNotFoundException extends RuntimeException {

    private final String errorReason;

    // Minimal constructor
    public UserNotFoundException(String message) {
        super(message);
        this.errorReason = "User not found";
    }

    // Another constructor with a custom reason
    public UserNotFoundException(String message, String reason) {
        super(message);
        this.errorReason = reason;
    }

}
