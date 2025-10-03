package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.List;

import com.noadminabuse.alpha.model.Translation;
import com.noadminabuse.alpha.web.dto.translation.TranslationDetailsDTO;

import lombok.experimental.UtilityClass;


@UtilityClass
public class TranslationMapper {
    
    public TranslationDetailsDTO toDTO(Translation entity) {
        return new TranslationDetailsDTO(
            entity.getId(), entity.getLang(), entity.getTKey(), entity.getTValue());
    }

    public List<TranslationDetailsDTO> toDTO(List<Translation> entities) {
        List<TranslationDetailsDTO> translations = new ArrayList<>();

        for (Translation translation : entities) {
            translations.add(TranslationMapper.toDTO(translation));
        }

        return translations;
    }

    public Translation toEntity(TranslationDetailsDTO dto) {
        return new Translation(
            dto.id(), 
            dto.lang(), 
            dto.tKey(), 
            dto.tValue()
        );
    }
}
