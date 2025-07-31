package com.noadminabuse.alpha.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.enums.CountryCode;

public interface CountryRepository extends JpaRepository<Country, CountryCode> {
    
}
