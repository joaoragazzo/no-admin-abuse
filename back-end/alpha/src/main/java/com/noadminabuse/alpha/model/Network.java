package com.noadminabuse.alpha.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Network {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String description;
    private String discord;
    private String instagram;
    private String youtube;
    private String website;

    @OneToMany(mappedBy = "network")
    private List<Server> servers = new ArrayList<>();

    @OneToMany(mappedBy = "network")
    private List<Review> reviews = new ArrayList<>();

    @OneToOne(mappedBy = "network")
    private User owner;

    public Network(UUID id,String name) {
        this.id = id;
        this.name = name;
    }

    public Network(String name) {
        this.name = name;
    }
}
