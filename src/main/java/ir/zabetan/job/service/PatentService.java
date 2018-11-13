package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.PatentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Patent.
 */
public interface PatentService {

    /**
     * Save a patent.
     *
     * @param patentDTO the entity to save
     * @return the persisted entity
     */
    PatentDTO save(PatentDTO patentDTO);

    /**
     * Get all the patents.
     *
     * @return the list of entities
     */
    List<PatentDTO> findAll();


    /**
     * Get the "id" patent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PatentDTO> findOne(String id);

    /**
     * Delete the "id" patent.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
