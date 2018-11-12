package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.CertificationService;
import ir.zabetan.job.domain.Certification;
import ir.zabetan.job.repository.CertificationRepository;
import ir.zabetan.job.service.dto.CertificationDTO;
import ir.zabetan.job.service.mapper.CertificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing Certification.
 */
@Service
public class CertificationServiceImpl implements CertificationService {

    private final Logger log = LoggerFactory.getLogger(CertificationServiceImpl.class);

    private final CertificationRepository certificationRepository;

    private final CertificationMapper certificationMapper;

    public CertificationServiceImpl(CertificationRepository certificationRepository, CertificationMapper certificationMapper) {
        this.certificationRepository = certificationRepository;
        this.certificationMapper = certificationMapper;
    }

    /**
     * Save a certification.
     *
     * @param certificationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CertificationDTO save(CertificationDTO certificationDTO) {
        log.debug("Request to save Certification : {}", certificationDTO);
        Certification certification = certificationMapper.toEntity(certificationDTO);
        certification = certificationRepository.save(certification);
        return certificationMapper.toDto(certification);
    }

    /**
     * Get all the certifications.
     *
     * @return the list of entities
     */
    @Override
    public List<CertificationDTO> findAll() {
        log.debug("Request to get all Certifications");
        return certificationRepository.findAll().stream()
            .map(certificationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one certification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<CertificationDTO> findOne(String id) {
        log.debug("Request to get Certification : {}", id);
        return certificationRepository.findById(id)
            .map(certificationMapper::toDto);
    }

    /**
     * Delete the certification by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Certification : {}", id);
        certificationRepository.deleteById(id);
    }
}
