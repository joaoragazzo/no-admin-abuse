package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.noadminabuse.alpha.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "author")
    private List<Review> reviews = new ArrayList<>();

    public User(String steamId, String username, String avatarUrl, Role role) {
        this.steamId = steamId;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.roles.add(role);
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
