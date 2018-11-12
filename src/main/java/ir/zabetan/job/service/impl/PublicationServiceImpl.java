package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.PublicationService;
import ir.zabetan.job.domain.Publication;
import ir.zabetan.job.repository.PublicationRepository;
import ir.zabetan.job.service.dto.PublicationDTO;
import ir.zabetan.job.service.mapper.PublicationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Publication.
 */
@Service
public class PublicationServiceImpl implements PublicationService {

    private final Logger log = LoggerFactory.getLogger(PublicationServiceImpl.class);

    private final PublicationRepository publicationRepository;

    private final PublicationMapper publicationMapper;

    public PublicationServiceImpl(PublicationRepository publicationRepository, PublicationMapper publicationMapper) {
        this.publicationRepository = publicationRepository;
        this.publicationMapper = publicationMapper;
    }

    /**
     * Save a publication.
     *
     * @param publicationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PublicationDTO save(PublicationDTO publicationDTO) {
        log.debug("Request to save Publication : {}", publicationDTO);
        Publication publication = publicationMapper.toEntity(publicationDTO);
        publication = publicationRepository.save(publication);
        return publicationMapper.toDto(publication);
    }

    /**
     * Get all the publications.
     *
     * @return the list of entities
     */
    @Override
    public List<PublicationDTO> findAll() {
        log.debug("Request to get all Publications");
        return publicationRepository.findAll().stream()
            .map(publicationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one publication by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<PublicationDTO> findOne(String id) {
        log.debug("Request to get Publication : {}", id);
        return publicationRepository.findById(id)
            .map(publicationMapper::toDto);
    }

    /**
     * Delete the publication by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Publication : {}", id);
        publicationRepository.deleteById(id);
    }
}
