package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noadminabuse.alpha.model.Translation;
import com.noadminabuse.alpha.repository.interfaces.KeyNamespaceDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationStatisticsDTO;

public interface TranslationRepository extends JpaRepository<Translation, UUID>{
    @Query("SELECT t FROM Translation t WHERE t.lang = :lang AND t.namespace=:namespace")
    List<Translation> findByLangAndNamespace(@Param("lang") String lang, @Param("namespace") String namespace);

    @Query("""
        SELECT DISTINCT 
            new com.noadminabuse.alpha.repository.interfaces.KeyNamespaceDTO(t.tKey, t.namespace) 
        FROM Translation t
    """)
    List<KeyNamespaceDTO> findAllDistinctKeysAndNamespaces();

    @Query("SELECT DISTINCT t.lang FROM Translation t")
    List<String> findAllLang();

    @Query("SELECT DISTINCT t.lang FROM Translation t")
    List<String> findAllDistinctLang();

    @Query("SELECT DISTINCT t.namespace FROM Translation t")
    List<String> findAllDistinctNamespace();

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Translation t WHERE t.lang = :lang AND t.tKey = :tKey")
    boolean existsByLangAndTKey(@Param("lang") String lang, @Param("tKey") String tKey);

    @Modifying
    @Query("DELETE FROM Translation t WHERE t.tKey = :tKey")
    void deleteByTKey(@Param("tKey") String tKey);

    @Query("""
        SELECT new com.noadminabuse.alpha.web.dto.translation.TranslationStatisticsDTO(
            CAST(COUNT(DISTINCT t.namespace) AS Integer),
            CAST(COUNT(DISTINCT t.tKey) AS Integer),
            CAST(COUNT(CASE WHEN t.tValue IS NOT NULL AND TRIM(t.tValue) != '' THEN 1 END) AS Integer),
            CAST(COUNT(CASE WHEN t.tValue IS NULL OR TRIM(t.tValue) = '' THEN 1 END) AS Integer)
        )
        FROM Translation t
    """)
    TranslationStatisticsDTO getTranslationStatistics();
}
