package com.noadminabuse.alpha.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.noadminabuse.alpha.enums.dayz.DayZGameTags;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Server {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false, unique = true)
    private String battleMetricsId;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String ip;
    
    @Column(nullable = false)
    private Integer port;
    
    @Column(nullable = false)
    private Integer maxPlayers;
    
    @Column(nullable = false)
    private Integer onlinePlayers;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<DayZGameTags> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @ManyToOne
    @JoinColumn(name = "network_id")
    private Network network;

    public Server(UUID id, 
        String name, 
        String ip, 
        Integer port, 
        List<DayZGameTags> tags, 
        Country country,
        Integer maxPlayers,
        Integer onlinePlayers,
        String battleMetricsId) {

        this.id = id;
        this.name = name;
        this.ip = ip;
        this.port = port;
        this.tags = tags;
        this.country = country;
        this.maxPlayers = maxPlayers;
        this.onlinePlayers = onlinePlayers;
        this.battleMetricsId = battleMetricsId;
    }
}
