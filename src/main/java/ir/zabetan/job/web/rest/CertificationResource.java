package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.CertificationService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.CertificationDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Certification.
 */
@RestController
@RequestMapping("/api")
public class CertificationResource {

    private final Logger log = LoggerFactory.getLogger(CertificationResource.class);

    private static final String ENTITY_NAME = "certification";

    private final CertificationService certificationService;

    public CertificationResource(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    /**
     * POST  /certifications : Create a new certification.
     *
     * @param certificationDTO the certificationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new certificationDTO, or with status 400 (Bad Request) if the certification has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/certifications")
    @Timed
    public ResponseEntity<CertificationDTO> createCertification(@RequestBody CertificationDTO certificationDTO) throws URISyntaxException {
        log.debug("REST request to save Certification : {}", certificationDTO);
        if (certificationDTO.getId() != null) {
            throw new BadRequestAlertException("A new certification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CertificationDTO result = certificationService.save(certificationDTO);
        return ResponseEntity.created(new URI("/api/certifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /certifications : Updates an existing certification.
     *
     * @param certificationDTO the certificationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated certificationDTO,
     * or with status 400 (Bad Request) if the certificationDTO is not valid,
     * or with status 500 (Internal Server Error) if the certificationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/certifications")
    @Timed
    public ResponseEntity<CertificationDTO> updateCertification(@RequestBody CertificationDTO certificationDTO) throws URISyntaxException {
        log.debug("REST request to update Certification : {}", certificationDTO);
        if (certificationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CertificationDTO result = certificationService.save(certificationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, certificationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /certifications : get all the certifications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of certifications in body
     */
    @GetMapping("/certifications")
    @Timed
    public List<CertificationDTO> getAllCertifications() {
        log.debug("REST request to get all Certifications");
        return certificationService.findAll();
    }

    /**
     * GET  /certifications/:id : get the "id" certification.
     *
     * @param id the id of the certificationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the certificationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/certifications/{id}")
    @Timed
    public ResponseEntity<CertificationDTO> getCertification(@PathVariable String id) {
        log.debug("REST request to get Certification : {}", id);
        Optional<CertificationDTO> certificationDTO = certificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(certificationDTO);
    }

    /**
     * DELETE  /certifications/:id : delete the "id" certification.
     *
     * @param id the id of the certificationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/certifications/{id}")
    @Timed
    public ResponseEntity<Void> deleteCertification(@PathVariable String id) {
        log.debug("REST request to delete Certification : {}", id);
        certificationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
