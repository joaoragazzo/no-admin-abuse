package com.noadminabuse.alpha.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.enums.CountryCode;
import com.noadminabuse.alpha.model.Country;

public interface CountryRepository extends JpaRepository<Country, CountryCode> {
    
}
