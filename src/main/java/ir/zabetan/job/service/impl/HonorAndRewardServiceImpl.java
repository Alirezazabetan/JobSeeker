package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.HonorAndRewardService;
import ir.zabetan.job.domain.HonorAndReward;
import ir.zabetan.job.repository.HonorAndRewardRepository;
import ir.zabetan.job.service.dto.HonorAndRewardDTO;
import ir.zabetan.job.service.mapper.HonorAndRewardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing HonorAndReward.
 */
@Service
public class HonorAndRewardServiceImpl implements HonorAndRewardService {

    private final Logger log = LoggerFactory.getLogger(HonorAndRewardServiceImpl.class);

    private final HonorAndRewardRepository honorAndRewardRepository;

    private final HonorAndRewardMapper honorAndRewardMapper;

    public HonorAndRewardServiceImpl(HonorAndRewardRepository honorAndRewardRepository, HonorAndRewardMapper honorAndRewardMapper) {
        this.honorAndRewardRepository = honorAndRewardRepository;
        this.honorAndRewardMapper = honorAndRewardMapper;
    }

    /**
     * Save a honorAndReward.
     *
     * @param honorAndRewardDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HonorAndRewardDTO save(HonorAndRewardDTO honorAndRewardDTO) {
        log.debug("Request to save HonorAndReward : {}", honorAndRewardDTO);
        HonorAndReward honorAndReward = honorAndRewardMapper.toEntity(honorAndRewardDTO);
        honorAndReward = honorAndRewardRepository.save(honorAndReward);
        return honorAndRewardMapper.toDto(honorAndReward);
    }

    /**
     * Get all the honorAndRewards.
     *
     * @return the list of entities
     */
    @Override
    public List<HonorAndRewardDTO> findAll() {
        log.debug("Request to get all HonorAndRewards");
        return honorAndRewardRepository.findAll().stream()
            .map(honorAndRewardMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one honorAndReward by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<HonorAndRewardDTO> findOne(String id) {
        log.debug("Request to get HonorAndReward : {}", id);
        return honorAndRewardRepository.findById(id)
            .map(honorAndRewardMapper::toDto);
    }

    /**
     * Delete the honorAndReward by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete HonorAndReward : {}", id);
        honorAndRewardRepository.deleteById(id);
    }
}
