package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NetworkTag {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable =  false)
    private boolean isPositive;

    @ManyToOne(optional = false)
    private Game game;

    @ManyToMany(mappedBy = "tags")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Review> reviews = new HashSet<>();

    private Instant createdAt;
    public NetworkTag(String slug, boolean isPositive, Game game) {
        this.slug = slug;
        this.game = game;
        this.createdAt = Instant.now();
        this.isPositive = isPositive;
    }

    public NetworkTag(UUID id) {
        this.id = id;
    }
}
