package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@Getter
@Setter
public class BadEndpointException extends Exception {

    @Serial
    private static final long serialVersionUID = 1L;
    private String errorCode;
    private String errorReason;
    public BadEndpointException(String errorCode, String message, String errorReason) {
        super(message);
        this.errorCode = errorCode;
        this.errorReason = errorReason;
    }
}
