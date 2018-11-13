package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.TestScoreDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TestScore.
 */
public interface TestScoreService {

    /**
     * Save a testScore.
     *
     * @param testScoreDTO the entity to save
     * @return the persisted entity
     */
    TestScoreDTO save(TestScoreDTO testScoreDTO);

    /**
     * Get all the testScores.
     *
     * @return the list of entities
     */
    List<TestScoreDTO> findAll();


    /**
     * Get the "id" testScore.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TestScoreDTO> findOne(String id);

    /**
     * Delete the "id" testScore.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
