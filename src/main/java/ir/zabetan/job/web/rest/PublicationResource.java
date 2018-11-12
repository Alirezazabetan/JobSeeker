package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.PublicationService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.PublicationDTO;
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
 * REST controller for managing Publication.
 */
@RestController
@RequestMapping("/api")
public class PublicationResource {

    private final Logger log = LoggerFactory.getLogger(PublicationResource.class);

    private static final String ENTITY_NAME = "publication";

    private final PublicationService publicationService;

    public PublicationResource(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    /**
     * POST  /publications : Create a new publication.
     *
     * @param publicationDTO the publicationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new publicationDTO, or with status 400 (Bad Request) if the publication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/publications")
    @Timed
    public ResponseEntity<PublicationDTO> createPublication(@RequestBody PublicationDTO publicationDTO) throws URISyntaxException {
        log.debug("REST request to save Publication : {}", publicationDTO);
        if (publicationDTO.getId() != null) {
            throw new BadRequestAlertException("A new publication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PublicationDTO result = publicationService.save(publicationDTO);
        return ResponseEntity.created(new URI("/api/publications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /publications : Updates an existing publication.
     *
     * @param publicationDTO the publicationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated publicationDTO,
     * or with status 400 (Bad Request) if the publicationDTO is not valid,
     * or with status 500 (Internal Server Error) if the publicationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/publications")
    @Timed
    public ResponseEntity<PublicationDTO> updatePublication(@RequestBody PublicationDTO publicationDTO) throws URISyntaxException {
        log.debug("REST request to update Publication : {}", publicationDTO);
        if (publicationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PublicationDTO result = publicationService.save(publicationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, publicationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /publications : get all the publications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of publications in body
     */
    @GetMapping("/publications")
    @Timed
    public List<PublicationDTO> getAllPublications() {
        log.debug("REST request to get all Publications");
        return publicationService.findAll();
    }

    /**
     * GET  /publications/:id : get the "id" publication.
     *
     * @param id the id of the publicationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the publicationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/publications/{id}")
    @Timed
    public ResponseEntity<PublicationDTO> getPublication(@PathVariable String id) {
        log.debug("REST request to get Publication : {}", id);
        Optional<PublicationDTO> publicationDTO = publicationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(publicationDTO);
    }

    /**
     * DELETE  /publications/:id : delete the "id" publication.
     *
     * @param id the id of the publicationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/publications/{id}")
    @Timed
    public ResponseEntity<Void> deletePublication(@PathVariable String id) {
        log.debug("REST request to delete Publication : {}", id);
        publicationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
