package ir.zabetan.job.service;

import ir.zabetan.job.service.dto.HonorAndRewardDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing HonorAndReward.
 */
public interface HonorAndRewardService {

    /**
     * Save a honorAndReward.
     *
     * @param honorAndRewardDTO the entity to save
     * @return the persisted entity
     */
    HonorAndRewardDTO save(HonorAndRewardDTO honorAndRewardDTO);

    /**
     * Get all the honorAndRewards.
     *
     * @return the list of entities
     */
    List<HonorAndRewardDTO> findAll();


    /**
     * Get the "id" honorAndReward.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HonorAndRewardDTO> findOne(String id);

    /**
     * Delete the "id" honorAndReward.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
