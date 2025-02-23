package com.projet_asi_ii.asi_ii.enumerations;

import lombok.AllArgsConstructor;

public enum TransactionTypeEnum {

    BUY("BUY"),
    SELL("SELL");

    private String type;

    TransactionTypeEnum(String type) {
        this.type = type;
    }
}
