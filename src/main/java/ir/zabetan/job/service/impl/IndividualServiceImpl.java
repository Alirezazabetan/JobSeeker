package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.IndividualService;
import ir.zabetan.job.domain.Individual;
import ir.zabetan.job.repository.IndividualRepository;
import ir.zabetan.job.service.dto.IndividualDTO;
import ir.zabetan.job.service.mapper.IndividualMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing Individual.
 */
@Service
public class IndividualServiceImpl implements IndividualService {

    private final Logger log = LoggerFactory.getLogger(IndividualServiceImpl.class);

    private final IndividualRepository individualRepository;

    private final IndividualMapper individualMapper;

    public IndividualServiceImpl(IndividualRepository individualRepository, IndividualMapper individualMapper) {
        this.individualRepository = individualRepository;
        this.individualMapper = individualMapper;
    }

    /**
     * Save a individual.
     *
     * @param individualDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IndividualDTO save(IndividualDTO individualDTO) {
        log.debug("Request to save Individual : {}", individualDTO);
        Individual individual = individualMapper.toEntity(individualDTO);
        individual = individualRepository.save(individual);
        return individualMapper.toDto(individual);
    }

    /**
     * Get all the individuals.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<IndividualDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Individuals");
        return individualRepository.findAll(pageable)
            .map(individualMapper::toDto);
    }


    /**
     * Get one individual by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<IndividualDTO> findOne(String id) {
        log.debug("Request to get Individual : {}", id);
        return individualRepository.findById(id)
            .map(individualMapper::toDto);
    }

    /**
     * Delete the individual by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Individual : {}", id);
        individualRepository.deleteById(id);
    }
}
