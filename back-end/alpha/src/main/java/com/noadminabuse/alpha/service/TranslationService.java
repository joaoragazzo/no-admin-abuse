package com.noadminabuse.alpha.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.common.FeedbackRegistry;
import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.TranslationErrorMessage;
import com.noadminabuse.alpha.model.Translation;
import com.noadminabuse.alpha.repository.TranslationRepository;
import com.noadminabuse.alpha.web.dto.translation.TranslationCellDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationRowDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationTableDTO;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranslationService {
    
    private final TranslationRepository translationRepository;
    private final FeedbackRegistry feedbackRegistry;

    @Transactional
    public Translation saveTranslation(UUID id, String newValue) {
        Translation translation = translationRepository.findById(id)
            .orElseThrow(() -> new NotFound(TranslationErrorMessage.TRANSLATION_NOT_FOUND));
        
        translation.setTValue(newValue);
        return translationRepository.save(translation);
    }

    public Map<String, String> getTranslation(String lang, String key) {
        List<Translation> translations = translationRepository.findByLangAndKey(lang, key);
        Map<String, String> map = new HashMap<>();
        for (Translation t : translations) {
            map.put(t.getTKey(), t.getTValue());
        }
        return map;
    }

    public List<Translation> getTranslationEntity() {
        return translationRepository.findAll();
    }

    public TranslationTableDTO getTranslationTable() {
        List<Translation> allTranslations = translationRepository.findAll();

        List<String> langs = allTranslations.stream()
                .map(Translation::getLang)
                .distinct()
                .toList();

        Map<String, List<Translation>> groupedByKey = allTranslations.stream()
                .collect(Collectors.groupingBy(Translation::getTKey));

        List<TranslationRowDTO> rows = groupedByKey.entrySet().stream()
                .map(entry -> {
                    String key = entry.getKey();
                    Map<String, TranslationCellDTO> translations = entry.getValue().stream()
                            .collect(Collectors.toMap(
                                    Translation::getLang,
                                    t -> new TranslationCellDTO(t.getId(), t.getTValue())
                            ));
                    return new TranslationRowDTO(key, translations);
                })
                .toList();

        return new TranslationTableDTO(langs, rows);
    }

    @Transactional
    public void createNewLanguage(String lang) {
        List<String> allKeys = translationRepository.findAllDistinctKeys();
        List<Translation> toSave = new ArrayList<>();
        for (String key : allKeys) {
            boolean exists = translationRepository.existsByLangAndTKey(lang, key);
            if (!exists) {
                Translation t = new Translation();
                t.setLang(lang);
                t.setTKey(key);
                t.setTValue(null);
                toSave.add(t);
            }
        }

        if (!toSave.isEmpty()) {
            translationRepository.saveAll(toSave);
        }
    }

    @Transactional
    public void createNewKey(String key) {
        List<String> allLangs = translationRepository.findAllDistinctLang();
        List<Translation> toSave = new ArrayList<>();
        for (String lang : allLangs) {
            boolean exists = translationRepository.existsByLangAndTKey(lang, key);
            if (!exists) {
                Translation t = new Translation();
                t.setLang(lang);
                t.setTKey(key);
                t.setTValue(null);
                toSave.add(t);
            }
        }

        if (!toSave.isEmpty()) {
            translationRepository.saveAll(toSave);
        }
    }

    public void deleteAllWithKey(String key) {
        translationRepository.deleteByTKey(key);
    }

    @PostConstruct
    @Transactional
    private void initDefaultTranslation() {
        if (translationRepository.count() == 0) {
            Translation t = new Translation();
            t.setLang("pt");
            t.setTKey("app.welcome");
            t.setTValue("Bem-vindo!");
            translationRepository.save(t);
        }
        initDefaultFeedbacks();
        
    }

    @Transactional
    private void initDefaultFeedbacks() {
        List<String> feedbacks = feedbackRegistry.allMessages();
        List<String> langs = translationRepository.findAllDistinctLang();
        List<Translation> toSave = new ArrayList<>();

        for (String fb : feedbacks) {
            String namespacedKey = "feedback." + fb;
    
            for (String lang : langs) {
                boolean exists = translationRepository.existsByLangAndTKey(lang, namespacedKey);
                if (!exists) {
                    Translation t = new Translation();
                    t.setLang(lang);
                    t.setTKey(namespacedKey);
                    t.setTValue(null); 
                    toSave.add(t);
                }
            }
        }
    
        if (!toSave.isEmpty()) {
            translationRepository.saveAll(toSave);
        }
    }
}
