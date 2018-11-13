package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.OrganizationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Organization.
 */
public interface OrganizationService {

    /**
     * Save a organization.
     *
     * @param organizationDTO the entity to save
     * @return the persisted entity
     */
    OrganizationDTO save(OrganizationDTO organizationDTO);

    /**
     * Get all the organizations.
     *
     * @return the list of entities
     */
    List<OrganizationDTO> findAll();


    /**
     * Get the "id" organization.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrganizationDTO> findOne(String id);

    /**
     * Delete the "id" organization.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
