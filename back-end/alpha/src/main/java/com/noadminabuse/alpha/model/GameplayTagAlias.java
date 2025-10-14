package com.noadminabuse.alpha.model;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "gameplay_tag_alias")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameplayTagAlias {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String alias;

    @ManyToOne(optional = false)
    @JoinColumn(name = "gameplay_tag_id", nullable = false)
    private GameplayTag gameplayTag;

}
