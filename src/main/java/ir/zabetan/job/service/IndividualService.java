package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.IndividualDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Individual.
 */
public interface IndividualService {

    /**
     * Save a individual.
     *
     * @param individualDTO the entity to save
     * @return the persisted entity
     */
    IndividualDTO save(IndividualDTO individualDTO);

    /**
     * Get all the individuals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IndividualDTO> findAll(Pageable pageable);


    /**
     * Get the "id" individual.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<IndividualDTO> findOne(String id);

    /**
     * Delete the "id" individual.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
