package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BannerNotActiveException extends GenericException {
    public BannerNotActiveException(String message, String errorReason) {
        super(message, errorReason);
    }
}