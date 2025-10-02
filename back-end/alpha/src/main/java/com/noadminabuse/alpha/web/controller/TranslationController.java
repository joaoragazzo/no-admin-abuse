package com.noadminabuse.alpha.web.controller;

import java.util.Map;

import com.noadminabuse.alpha.service.TranslationService;
import com.noadminabuse.alpha.web.controller.docs.TranslationApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/i18n")
public class TranslationController extends BaseController implements TranslationApi{
    
    private final TranslationService translationService;

    @GetMapping("/{lang}/{namespace}")
    public ApiResponseDTO<Map<String,String>> getLanguage(@PathVariable String lang, @PathVariable String namespace) {
        return ok(translationService.getTranslation(lang, namespace));
    }  
    
}

