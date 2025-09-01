package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noadminabuse.alpha.model.Translation;

public interface TranslationRepository extends JpaRepository<Translation, UUID>{
    @Query("SELECT t FROM Translation t WHERE t.lang = :lang AND t.tKey LIKE CONCAT('%', :key, '%')")
    List<Translation> findByLangAndKey(@Param("lang") String lang, @Param("key") String key);

    @Query("SELECT DISTINCT t.tKey FROM Translation t")
    List<String> findAllDistinctKeys();

    @Query("SELECT DISTINCT t.lang FROM Translation t")
    List<String> findAllLang();

    @Query("SELECT DISTINCT t.lang FROM Translation t")
    List<String> findAllDistinctLang();

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Translation t WHERE t.lang = :lang AND t.tKey = :tKey")
    boolean existsByLangAndTKey(@Param("lang") String lang, @Param("tKey") String tKey);
}
