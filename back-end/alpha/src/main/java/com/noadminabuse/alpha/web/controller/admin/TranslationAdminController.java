package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.TranslationMapper;
import com.noadminabuse.alpha.messages.TranslationMessage;
import com.noadminabuse.alpha.model.Translation;
import com.noadminabuse.alpha.service.TranslationService;
import com.noadminabuse.alpha.web.controller.BaseController;
import com.noadminabuse.alpha.web.controller.admin.docs.TranslationAdminApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationDetailsDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationStatisticsDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationTableDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationUpdateDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/admin/i18n")
public class TranslationAdminController extends BaseController implements TranslationAdminApi {
    private final TranslationService translationService;
    private final TranslationMapper translationMapper;

    @GetMapping
    public ApiResponseDTO<TranslationTableDTO> getTranslationTable() {
        return ok(translationService.getTranslationTable());
    }

    @GetMapping("/statistics")
    public ApiResponseDTO<TranslationStatisticsDTO> getStats() {
        return ok(translationService.getTranslationStatistics());
    }
    
    @PatchMapping
    public ApiResponseDTO<TranslationDetailsDTO> saveTranslation(@RequestBody @Valid TranslationUpdateDTO dto) {
        Translation newTranslation = translationService.saveTranslation(
            dto.id(),
            dto.value()
        );

        return success(translationMapper.toDTO(newTranslation), TranslationMessage.TRANSLATION_SUCCESS_SAVED);
    }

    @PostMapping("/create/{lang}")
    public ApiResponseDTO<Void> createNewTranslation(@PathVariable String lang) {
        translationService.createNewLanguage(lang);
        return ok(null);
    }
    

}
