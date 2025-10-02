package com.noadminabuse.alpha.model;

import com.noadminabuse.alpha.enums.CountryCode;
import com.noadminabuse.alpha.enums.Region;
import com.noadminabuse.alpha.utils.RegionMapper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "country")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Country {
    
    @Id
    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private CountryCode code;

    @Enumerated(EnumType.STRING)
    private Region region;

    public Country(CountryCode code) {
        this.code = code;
    }

    public void resolveRegion() {
        if (this.region == null && this.code != null) {
            this.region = RegionMapper.getRegionForIso(this.code);
        }
    }

}
