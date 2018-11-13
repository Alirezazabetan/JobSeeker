package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.AccomplishmentService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.AccomplishmentDTO;
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
 * REST controller for managing Accomplishment.
 */
@RestController
@RequestMapping("/api")
public class AccomplishmentResource {

    private final Logger log = LoggerFactory.getLogger(AccomplishmentResource.class);

    private static final String ENTITY_NAME = "accomplishment";

    private final AccomplishmentService accomplishmentService;

    public AccomplishmentResource(AccomplishmentService accomplishmentService) {
        this.accomplishmentService = accomplishmentService;
    }

    /**
     * POST  /accomplishments : Create a new accomplishment.
     *
     * @param accomplishmentDTO the accomplishmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accomplishmentDTO, or with status 400 (Bad Request) if the accomplishment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/accomplishments")
    @Timed
    public ResponseEntity<AccomplishmentDTO> createAccomplishment(@RequestBody AccomplishmentDTO accomplishmentDTO) throws URISyntaxException {
        log.debug("REST request to save Accomplishment : {}", accomplishmentDTO);
        if (accomplishmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new accomplishment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccomplishmentDTO result = accomplishmentService.save(accomplishmentDTO);
        return ResponseEntity.created(new URI("/api/accomplishments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /accomplishments : Updates an existing accomplishment.
     *
     * @param accomplishmentDTO the accomplishmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accomplishmentDTO,
     * or with status 400 (Bad Request) if the accomplishmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the accomplishmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/accomplishments")
    @Timed
    public ResponseEntity<AccomplishmentDTO> updateAccomplishment(@RequestBody AccomplishmentDTO accomplishmentDTO) throws URISyntaxException {
        log.debug("REST request to update Accomplishment : {}", accomplishmentDTO);
        if (accomplishmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccomplishmentDTO result = accomplishmentService.save(accomplishmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accomplishmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /accomplishments : get all the accomplishments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accomplishments in body
     */
    @GetMapping("/accomplishments")
    @Timed
    public List<AccomplishmentDTO> getAllAccomplishments() {
        log.debug("REST request to get all Accomplishments");
        return accomplishmentService.findAll();
    }

    /**
     * GET  /accomplishments/:id : get the "id" accomplishment.
     *
     * @param id the id of the accomplishmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accomplishmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/accomplishments/{id}")
    @Timed
    public ResponseEntity<AccomplishmentDTO> getAccomplishment(@PathVariable String id) {
        log.debug("REST request to get Accomplishment : {}", id);
        Optional<AccomplishmentDTO> accomplishmentDTO = accomplishmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(accomplishmentDTO);
    }

    /**
     * DELETE  /accomplishments/:id : delete the "id" accomplishment.
     *
     * @param id the id of the accomplishmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/accomplishments/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccomplishment(@PathVariable String id) {
        log.debug("REST request to delete Accomplishment : {}", id);
        accomplishmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
