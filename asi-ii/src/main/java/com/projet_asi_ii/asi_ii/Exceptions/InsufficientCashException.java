package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;

@Getter
public class InsufficientCashException extends RuntimeException {
  private final String errorReason;

  public InsufficientCashException(String message) {
    super(message);
    this.errorReason = "Insufficient Cash";
  }

  public InsufficientCashException(String message, String errorReason) {
    super(message);
    this.errorReason = errorReason;
  }

}
