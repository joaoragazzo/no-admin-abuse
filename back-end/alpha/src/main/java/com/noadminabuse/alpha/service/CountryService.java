package com.noadminabuse.alpha.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.enums.CountryCode;
import com.noadminabuse.alpha.repository.CountryRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CountryService {
    
    private final CountryRepository countryRepository;

    public Country findOrCreate(CountryCode code) {
        return countryRepository.findById(code).orElseGet(
            () -> {
                Country newCountry = new Country(code);
                newCountry.resolveRegion();
                return countryRepository.save(newCountry);
            }
        );
    }

    public List<Country> findOrCreate(List<CountryCode> codes) {
        Set<CountryCode> inputCodes = new HashSet<>(codes);
        
        Set<CountryCode> existingCodes = countryRepository
            .findAll()
            .stream()
            .map(Country::getCode)
            .collect(Collectors.toSet());
            
        List<CountryCode> missingCodes = inputCodes
            .stream()
            .filter(code -> !existingCodes.contains(code))
            .collect(Collectors.toList());

        List<Country> newCountries = missingCodes
            .stream()
            .map(code -> {
                Country c = new Country(code);
                c.resolveRegion();
                return c;
            }).collect(Collectors.toList());

        newCountries.forEach(c -> {
            if (c.getCode() == null) {
                throw new IllegalStateException("Country com ID nulo antes do save: " + c);
            }
        });
        
        countryRepository.saveAll(newCountries);
        List<Country> result = new ArrayList<>(countryRepository.findAllById(inputCodes));
        return result;
    }
}
