package com.noadminabuse.alpha.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.enums.general.Region;

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

    private String name;
    private String ip;
    private String port;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<DayZGameTags> tags = new ArrayList<>();

    private Region region;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private ServerGroup group;

    public Server(UUID id, String name, String ip, String port, List<DayZGameTags> tags, Region region) {
        this.id=id;
        this.name=name;
        this.ip=ip;
        this.port=port;
        this.tags=tags;
        this.region=region;
    }
}
