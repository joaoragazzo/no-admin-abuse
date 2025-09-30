package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(length = 3000)
    @Size(max = 3000)
    private String text;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = false)
    private boolean anonymous;

    @ManyToOne
    @JoinColumn(name = "network_id")
    private Network network;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToMany(mappedBy = "likedReviews")
    private Set<User> likedByUsers = new HashSet<>();

    @Column(nullable = false)
    private Instant createdAt;

    @ManyToMany
    @JoinTable(
        name = "review_tag",
        joinColumns = @JoinColumn(name = "review_id"),
        inverseJoinColumns = @JoinColumn(name = "networktag_id")
    )
    private Set<NetworkTag> tags = new HashSet<>();

    public Review(String text, Integer rating, boolean anonymous, User author, Network network, Set<NetworkTag> tags) {
        this.text = text;
        this.rating = rating;
        this.anonymous = anonymous;
        this.network = network;
        this.author = author;

        if (tags != null) {
            this.tags.addAll(tags);
        }

        this.createdAt = Instant.now();
    }
}
