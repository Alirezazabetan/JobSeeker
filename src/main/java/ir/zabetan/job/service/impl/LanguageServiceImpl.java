package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.LanguageService;
import ir.zabetan.job.domain.Language;
import ir.zabetan.job.repository.LanguageRepository;
import ir.zabetan.job.service.dto.LanguageDTO;
import ir.zabetan.job.service.mapper.LanguageMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Language.
 */
@Service
public class LanguageServiceImpl implements LanguageService {

    private final Logger log = LoggerFactory.getLogger(LanguageServiceImpl.class);

    private final LanguageRepository languageRepository;

    private final LanguageMapper languageMapper;

    public LanguageServiceImpl(LanguageRepository languageRepository, LanguageMapper languageMapper) {
        this.languageRepository = languageRepository;
        this.languageMapper = languageMapper;
    }

    /**
     * Save a language.
     *
     * @param languageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LanguageDTO save(LanguageDTO languageDTO) {
        log.debug("Request to save Language : {}", languageDTO);
        Language language = languageMapper.toEntity(languageDTO);
        language = languageRepository.save(language);
        return languageMapper.toDto(language);
    }

    /**
     * Get all the languages.
     *
     * @return the list of entities
     */
    @Override
    public List<LanguageDTO> findAll() {
        log.debug("Request to get all Languages");
        return languageRepository.findAll().stream()
            .map(languageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one language by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<LanguageDTO> findOne(String id) {
        log.debug("Request to get Language : {}", id);
        return languageRepository.findById(id)
            .map(languageMapper::toDto);
    }

    /**
     * Delete the language by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Language : {}", id);
        languageRepository.deleteById(id);
    }
}
