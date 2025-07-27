package com.noadminabuse.alpha.model.enums.dayz;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum DayZGameTags {
    VANILLA("Vanilla"),
    VANILLAP("Vanilla+"),
    VANILLAPP("Vanilla++"),
    HARDCORE("Hardcore"),
    FPP("1PP"),
    TPP("3PP"),
    PVP("PvP"),
    PVE("PvE"),
    SOLO("Solo"),
    DUO("Duo"),
    TRIO("Trio"),
    SQUAD("Squad"),
    FULLMOD("Full Mod"),
    FULLPVP("Full PvP"),
    DEATHMATCH("Deathmatch"),
    NOBASE("No base"),
    NORAID("No Raid"),
    WIPE("Wipe"),
    ROLEPLAY("Roleplay");

    private final String label;

    DayZGameTags(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static DayZGameTags fromValue(String value) {
        if (value == null) return null;

        for (DayZGameTags tag : values()) {
            if (tag.label.equalsIgnoreCase(value)) {
                return tag;
            }
            if (tag.name().equalsIgnoreCase(value)) {
                return tag;
            }
        }
        throw new IllegalArgumentException("Tag inválida: " + value);
    }

}
