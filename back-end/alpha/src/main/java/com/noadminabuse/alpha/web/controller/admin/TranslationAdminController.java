package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.TranslationMapper;
import com.noadminabuse.alpha.model.Translation;
import com.noadminabuse.alpha.service.TranslationService;
import com.noadminabuse.alpha.web.dto.translation.TranslationDetailsDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationTableDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationUpdateDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@AllArgsConstructor
@RequestMapping("/admin/i18n")
public class TranslationAdminController {
    private final TranslationService translationService;
    private final TranslationMapper translationMapper;

    @GetMapping
    public ResponseEntity<TranslationTableDTO> getTranslationTable() {
        return ResponseEntity.ok().body(translationService.getTranslationTable());
    }
    
    @PatchMapping
    public ResponseEntity<TranslationDetailsDTO> saveTranslation(@RequestBody @Valid TranslationUpdateDTO dto) {
        Translation newTranslation = translationService.saveTranslation(
            dto.id(),
            dto.value()
        );

        return ResponseEntity.ok().body(
            translationMapper.toDTO(newTranslation)
        );
    }

    @PostMapping("/create/{lang}")
    public ResponseEntity<?> createNewTranslation(@PathVariable String lang) {
        translationService.createNewLanguage(lang);
        return ResponseEntity.ok().body(null);
    }
    

}
