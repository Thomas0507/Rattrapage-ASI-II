package com.projet_asi_ii.asi_ii.Exceptions;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BannerHasEndedException extends GenericException {
    public BannerHasEndedException(String message, String errorReason, String errorCode) {
        super(message, errorCode, errorReason);
    }
}