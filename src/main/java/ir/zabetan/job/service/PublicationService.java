package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.PublicationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Publication.
 */
public interface PublicationService {

    /**
     * Save a publication.
     *
     * @param publicationDTO the entity to save
     * @return the persisted entity
     */
    PublicationDTO save(PublicationDTO publicationDTO);

    /**
     * Get all the publications.
     *
     * @return the list of entities
     */
    List<PublicationDTO> findAll();


    /**
     * Get the "id" publication.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PublicationDTO> findOne(String id);

    /**
     * Delete the "id" publication.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
