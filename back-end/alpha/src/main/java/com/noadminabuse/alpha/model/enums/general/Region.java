package com.noadminabuse.alpha.model.enums.general;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Region {
    EU("Europa"),
    RU("Rússia"),
    BR("Brasil"),
    SA("América do Sul"),
    NA("América do Norte"),
    OC("Oceania");

    private final String label;

    Region(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Region fromValue(String value) {
        if (value == null) return null;

        for (Region tag : values()) {
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
