package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    private String steamId;
    private String username;
    private String avatarUrl;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isBanned = false;
    
    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean isSysAdmin = false;

    @OneToMany(mappedBy = "author")
    private List<Review> reviews = new ArrayList<>();
}
