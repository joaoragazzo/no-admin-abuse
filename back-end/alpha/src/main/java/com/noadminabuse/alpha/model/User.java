package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(unique = true)
    private String steamId;
    private String username;
    private String avatarUrl;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean acceptedEula;
    
    private Instant acceptedEulaAt;
    private Instant lastLoginAt;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "network_id", unique = true)
    private Network network;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isBanned = false;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isSysAdmin = false;

    @OneToMany(mappedBy = "author")
    private List<Review> reviews = new ArrayList<>();

    public User(String steamId, String username, String avatarUrl) {
        this.steamId = steamId;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    public User(UUID uuid) {
        this.id = uuid;
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
            lastLoginAt = Instant.now();
        }
    }
}
