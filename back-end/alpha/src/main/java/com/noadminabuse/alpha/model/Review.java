package com.noadminabuse.alpha.model;

import java.time.Instant;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
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

    @Column(nullable = false)
    private Instant createdAt;

    public Review(String text, Integer rating, boolean anonymous, User author, Network network) {
        this.text = text;
        this.rating = rating;
        this.anonymous = anonymous;
        this.network = network;
        this.author = author;
        this.createdAt = Instant.now();
    }
}
