package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.IndividualService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.web.rest.util.PaginationUtil;
import ir.zabetan.job.service.dto.IndividualDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Individual.
 */
@RestController
@RequestMapping("/api")
public class IndividualResource {

    private final Logger log = LoggerFactory.getLogger(IndividualResource.class);

    private static final String ENTITY_NAME = "individual";

    private final IndividualService individualService;

    public IndividualResource(IndividualService individualService) {
        this.individualService = individualService;
    }

    /**
     * POST  /individuals : Create a new individual.
     *
     * @param individualDTO the individualDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new individualDTO, or with status 400 (Bad Request) if the individual has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/individuals")
    @Timed
    public ResponseEntity<IndividualDTO> createIndividual(@RequestBody IndividualDTO individualDTO) throws URISyntaxException {
        log.debug("REST request to save Individual : {}", individualDTO);
        if (individualDTO.getId() != null) {
            throw new BadRequestAlertException("A new individual cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IndividualDTO result = individualService.save(individualDTO);
        return ResponseEntity.created(new URI("/api/individuals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /individuals : Updates an existing individual.
     *
     * @param individualDTO the individualDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated individualDTO,
     * or with status 400 (Bad Request) if the individualDTO is not valid,
     * or with status 500 (Internal Server Error) if the individualDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/individuals")
    @Timed
    public ResponseEntity<IndividualDTO> updateIndividual(@RequestBody IndividualDTO individualDTO) throws URISyntaxException {
        log.debug("REST request to update Individual : {}", individualDTO);
        if (individualDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IndividualDTO result = individualService.save(individualDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, individualDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /individuals : get all the individuals.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of individuals in body
     */
    @GetMapping("/individuals")
    @Timed
    public ResponseEntity<List<IndividualDTO>> getAllIndividuals(Pageable pageable) {
        log.debug("REST request to get a page of Individuals");
        Page<IndividualDTO> page = individualService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/individuals");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /individuals/:id : get the "id" individual.
     *
     * @param id the id of the individualDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the individualDTO, or with status 404 (Not Found)
     */
    @GetMapping("/individuals/{id}")
    @Timed
    public ResponseEntity<IndividualDTO> getIndividual(@PathVariable String id) {
        log.debug("REST request to get Individual : {}", id);
        Optional<IndividualDTO> individualDTO = individualService.findOne(id);
        return ResponseUtil.wrapOrNotFound(individualDTO);
    }

    /**
     * DELETE  /individuals/:id : delete the "id" individual.
     *
     * @param id the id of the individualDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/individuals/{id}")
    @Timed
    public ResponseEntity<Void> deleteIndividual(@PathVariable String id) {
        log.debug("REST request to delete Individual : {}", id);
        individualService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
