package com.noadminabuse.alpha.model;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"tKey", "lang"})
    }
)
public class Translation {
    
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable =  false)
    private String lang;

    @Column(nullable = false)
    private String tKey;

    private String tValue;

}
