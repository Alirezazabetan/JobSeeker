package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.PatentService;
import ir.zabetan.job.domain.Patent;
import ir.zabetan.job.repository.PatentRepository;
import ir.zabetan.job.service.dto.PatentDTO;
import ir.zabetan.job.service.mapper.PatentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Patent.
 */
@Service
public class PatentServiceImpl implements PatentService {

    private final Logger log = LoggerFactory.getLogger(PatentServiceImpl.class);

    private final PatentRepository patentRepository;

    private final PatentMapper patentMapper;

    public PatentServiceImpl(PatentRepository patentRepository, PatentMapper patentMapper) {
        this.patentRepository = patentRepository;
        this.patentMapper = patentMapper;
    }

    /**
     * Save a patent.
     *
     * @param patentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PatentDTO save(PatentDTO patentDTO) {
        log.debug("Request to save Patent : {}", patentDTO);
        Patent patent = patentMapper.toEntity(patentDTO);
        patent = patentRepository.save(patent);
        return patentMapper.toDto(patent);
    }

    /**
     * Get all the patents.
     *
     * @return the list of entities
     */
    @Override
    public List<PatentDTO> findAll() {
        log.debug("Request to get all Patents");
        return patentRepository.findAll().stream()
            .map(patentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one patent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<PatentDTO> findOne(String id) {
        log.debug("Request to get Patent : {}", id);
        return patentRepository.findById(id)
            .map(patentMapper::toDto);
    }

    /**
     * Delete the patent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Patent : {}", id);
        patentRepository.deleteById(id);
    }
}
