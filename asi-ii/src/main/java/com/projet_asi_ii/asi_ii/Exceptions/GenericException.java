package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenericException extends Exception {
    private String errorReason;
    
    public GenericException(String message, String errorReason) {
      super(message);
      this.errorReason = errorReason;
    }
}
