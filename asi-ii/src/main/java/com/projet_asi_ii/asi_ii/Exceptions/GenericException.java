package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenericException extends Exception {
    private String errorCode;
    private String errorReason;
    
    public GenericException(String message, String errorCode, String errorReason) {
      super(message);
      this.errorCode = errorCode;
      this.errorReason = errorReason;
    }
}
