package com.noadminabuse.alpha.enums;

public enum Role {
    ROOT("ROOT"),
    ADMIN("ADMIN"),
    USER("USER");

    private final String authority;

    Role(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }
}
