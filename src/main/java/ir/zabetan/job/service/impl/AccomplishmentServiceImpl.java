package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.AccomplishmentService;
import ir.zabetan.job.domain.Accomplishment;
import ir.zabetan.job.repository.AccomplishmentRepository;
import ir.zabetan.job.service.dto.AccomplishmentDTO;
import ir.zabetan.job.service.mapper.AccomplishmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Accomplishment.
 */
@Service
public class AccomplishmentServiceImpl implements AccomplishmentService {

    private final Logger log = LoggerFactory.getLogger(AccomplishmentServiceImpl.class);

    private final AccomplishmentRepository accomplishmentRepository;

    private final AccomplishmentMapper accomplishmentMapper;

    public AccomplishmentServiceImpl(AccomplishmentRepository accomplishmentRepository, AccomplishmentMapper accomplishmentMapper) {
        this.accomplishmentRepository = accomplishmentRepository;
        this.accomplishmentMapper = accomplishmentMapper;
    }

    /**
     * Save a accomplishment.
     *
     * @param accomplishmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AccomplishmentDTO save(AccomplishmentDTO accomplishmentDTO) {
        log.debug("Request to save Accomplishment : {}", accomplishmentDTO);
        Accomplishment accomplishment = accomplishmentMapper.toEntity(accomplishmentDTO);
        accomplishment = accomplishmentRepository.save(accomplishment);
        return accomplishmentMapper.toDto(accomplishment);
    }

    /**
     * Get all the accomplishments.
     *
     * @return the list of entities
     */
    @Override
    public List<AccomplishmentDTO> findAll() {
        log.debug("Request to get all Accomplishments");
        return accomplishmentRepository.findAll().stream()
            .map(accomplishmentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one accomplishment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<AccomplishmentDTO> findOne(String id) {
        log.debug("Request to get Accomplishment : {}", id);
        return accomplishmentRepository.findById(id)
            .map(accomplishmentMapper::toDto);
    }

    /**
     * Delete the accomplishment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Accomplishment : {}", id);
        accomplishmentRepository.deleteById(id);
    }
}
