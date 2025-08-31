package com.noadminabuse.alpha.web.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.noadminabuse.alpha.service.TranslationService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/i18n")
public class TranslationController {
    
    private final TranslationService translationService;

    @GetMapping("/{lang}/{key}")
    public  ResponseEntity<Map<String,String>> getLanguage(@PathVariable String lang, @PathVariable String key) {
        return ResponseEntity.ok().body(translationService.getTranslation(lang, key));
    }  
    
}

