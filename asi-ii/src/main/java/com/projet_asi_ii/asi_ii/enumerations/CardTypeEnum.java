package com.projet_asi_ii.asi_ii.enumerations;

public enum CardTypeEnum {
    FIRE("FIRE"),
    GRASS("GRASS"),
    GROUND("GROUND"),
    WATER("WATER"),
    ICE("ICE"),
    DRAGON("DRAGON"),
    DARK("DARK"),
    NEUTRAL("NEUTRAL"),
    ELECTRIC("ELECTRIC");
    private String type;

    CardTypeEnum(String type) {
        this.type = type;
    }
}
