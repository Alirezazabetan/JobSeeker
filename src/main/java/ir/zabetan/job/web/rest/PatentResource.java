package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.PatentService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.PatentDTO;
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
 * REST controller for managing Patent.
 */
@RestController
@RequestMapping("/api")
public class PatentResource {

    private final Logger log = LoggerFactory.getLogger(PatentResource.class);

    private static final String ENTITY_NAME = "patent";

    private final PatentService patentService;

    public PatentResource(PatentService patentService) {
        this.patentService = patentService;
    }

    /**
     * POST  /patents : Create a new patent.
     *
     * @param patentDTO the patentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patentDTO, or with status 400 (Bad Request) if the patent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patents")
    @Timed
    public ResponseEntity<PatentDTO> createPatent(@RequestBody PatentDTO patentDTO) throws URISyntaxException {
        log.debug("REST request to save Patent : {}", patentDTO);
        if (patentDTO.getId() != null) {
            throw new BadRequestAlertException("A new patent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PatentDTO result = patentService.save(patentDTO);
        return ResponseEntity.created(new URI("/api/patents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /patents : Updates an existing patent.
     *
     * @param patentDTO the patentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patentDTO,
     * or with status 400 (Bad Request) if the patentDTO is not valid,
     * or with status 500 (Internal Server Error) if the patentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patents")
    @Timed
    public ResponseEntity<PatentDTO> updatePatent(@RequestBody PatentDTO patentDTO) throws URISyntaxException {
        log.debug("REST request to update Patent : {}", patentDTO);
        if (patentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PatentDTO result = patentService.save(patentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, patentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /patents : get all the patents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of patents in body
     */
    @GetMapping("/patents")
    @Timed
    public List<PatentDTO> getAllPatents() {
        log.debug("REST request to get all Patents");
        return patentService.findAll();
    }

    /**
     * GET  /patents/:id : get the "id" patent.
     *
     * @param id the id of the patentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/patents/{id}")
    @Timed
    public ResponseEntity<PatentDTO> getPatent(@PathVariable String id) {
        log.debug("REST request to get Patent : {}", id);
        Optional<PatentDTO> patentDTO = patentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(patentDTO);
    }

    /**
     * DELETE  /patents/:id : delete the "id" patent.
     *
     * @param id the id of the patentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patents/{id}")
    @Timed
    public ResponseEntity<Void> deletePatent(@PathVariable String id) {
        log.debug("REST request to delete Patent : {}", id);
        patentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
