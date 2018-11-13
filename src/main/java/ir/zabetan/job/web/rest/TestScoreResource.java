package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.TestScoreService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.TestScoreDTO;
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
 * REST controller for managing TestScore.
 */
@RestController
@RequestMapping("/api")
public class TestScoreResource {

    private final Logger log = LoggerFactory.getLogger(TestScoreResource.class);

    private static final String ENTITY_NAME = "testScore";

    private final TestScoreService testScoreService;

    public TestScoreResource(TestScoreService testScoreService) {
        this.testScoreService = testScoreService;
    }

    /**
     * POST  /test-scores : Create a new testScore.
     *
     * @param testScoreDTO the testScoreDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testScoreDTO, or with status 400 (Bad Request) if the testScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-scores")
    @Timed
    public ResponseEntity<TestScoreDTO> createTestScore(@RequestBody TestScoreDTO testScoreDTO) throws URISyntaxException {
        log.debug("REST request to save TestScore : {}", testScoreDTO);
        if (testScoreDTO.getId() != null) {
            throw new BadRequestAlertException("A new testScore cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TestScoreDTO result = testScoreService.save(testScoreDTO);
        return ResponseEntity.created(new URI("/api/test-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-scores : Updates an existing testScore.
     *
     * @param testScoreDTO the testScoreDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testScoreDTO,
     * or with status 400 (Bad Request) if the testScoreDTO is not valid,
     * or with status 500 (Internal Server Error) if the testScoreDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-scores")
    @Timed
    public ResponseEntity<TestScoreDTO> updateTestScore(@RequestBody TestScoreDTO testScoreDTO) throws URISyntaxException {
        log.debug("REST request to update TestScore : {}", testScoreDTO);
        if (testScoreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TestScoreDTO result = testScoreService.save(testScoreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testScoreDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-scores : get all the testScores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testScores in body
     */
    @GetMapping("/test-scores")
    @Timed
    public List<TestScoreDTO> getAllTestScores() {
        log.debug("REST request to get all TestScores");
        return testScoreService.findAll();
    }

    /**
     * GET  /test-scores/:id : get the "id" testScore.
     *
     * @param id the id of the testScoreDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testScoreDTO, or with status 404 (Not Found)
     */
    @GetMapping("/test-scores/{id}")
    @Timed
    public ResponseEntity<TestScoreDTO> getTestScore(@PathVariable String id) {
        log.debug("REST request to get TestScore : {}", id);
        Optional<TestScoreDTO> testScoreDTO = testScoreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(testScoreDTO);
    }

    /**
     * DELETE  /test-scores/:id : delete the "id" testScore.
     *
     * @param id the id of the testScoreDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-scores/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestScore(@PathVariable String id) {
        log.debug("REST request to delete TestScore : {}", id);
        testScoreService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
