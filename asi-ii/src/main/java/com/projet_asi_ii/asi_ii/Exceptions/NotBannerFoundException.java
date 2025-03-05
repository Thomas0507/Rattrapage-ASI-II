package com.projet_asi_ii.asi_ii.Exceptions;

public class NotBannerFoundException extends GenericException{
    public NotBannerFoundException() {
        super("No banner were found", "Either you're banned, or the app shut down :/");
    }
}
