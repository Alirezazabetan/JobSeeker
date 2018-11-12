package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.AccomplishmentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Accomplishment.
 */
public interface AccomplishmentService {

    /**
     * Save a accomplishment.
     *
     * @param accomplishmentDTO the entity to save
     * @return the persisted entity
     */
    AccomplishmentDTO save(AccomplishmentDTO accomplishmentDTO);

    /**
     * Get all the accomplishments.
     *
     * @return the list of entities
     */
    List<AccomplishmentDTO> findAll();


    /**
     * Get the "id" accomplishment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AccomplishmentDTO> findOne(String id);

    /**
     * Delete the "id" accomplishment.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
