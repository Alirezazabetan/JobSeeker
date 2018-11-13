package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.JobPostDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing JobPost.
 */
public interface JobPostService {

    /**
     * Save a jobPost.
     *
     * @param jobPostDTO the entity to save
     * @return the persisted entity
     */
    JobPostDTO save(JobPostDTO jobPostDTO);

    /**
     * Get all the jobPosts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<JobPostDTO> findAll(Pageable pageable);


    /**
     * Get the "id" jobPost.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<JobPostDTO> findOne(String id);

    /**
     * Delete the "id" jobPost.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
