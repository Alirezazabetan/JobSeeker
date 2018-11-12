package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.JobPostService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.web.rest.util.PaginationUtil;
import ir.zabetan.job.service.dto.JobPostDTO;
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
 * REST controller for managing JobPost.
 */
@RestController
@RequestMapping("/api")
public class JobPostResource {

    private final Logger log = LoggerFactory.getLogger(JobPostResource.class);

    private static final String ENTITY_NAME = "jobPost";

    private final JobPostService jobPostService;

    public JobPostResource(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }

    /**
     * POST  /job-posts : Create a new jobPost.
     *
     * @param jobPostDTO the jobPostDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobPostDTO, or with status 400 (Bad Request) if the jobPost has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-posts")
    @Timed
    public ResponseEntity<JobPostDTO> createJobPost(@RequestBody JobPostDTO jobPostDTO) throws URISyntaxException {
        log.debug("REST request to save JobPost : {}", jobPostDTO);
        if (jobPostDTO.getId() != null) {
            throw new BadRequestAlertException("A new jobPost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobPostDTO result = jobPostService.save(jobPostDTO);
        return ResponseEntity.created(new URI("/api/job-posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-posts : Updates an existing jobPost.
     *
     * @param jobPostDTO the jobPostDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobPostDTO,
     * or with status 400 (Bad Request) if the jobPostDTO is not valid,
     * or with status 500 (Internal Server Error) if the jobPostDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-posts")
    @Timed
    public ResponseEntity<JobPostDTO> updateJobPost(@RequestBody JobPostDTO jobPostDTO) throws URISyntaxException {
        log.debug("REST request to update JobPost : {}", jobPostDTO);
        if (jobPostDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JobPostDTO result = jobPostService.save(jobPostDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobPostDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-posts : get all the jobPosts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobPosts in body
     */
    @GetMapping("/job-posts")
    @Timed
    public ResponseEntity<List<JobPostDTO>> getAllJobPosts(Pageable pageable) {
        log.debug("REST request to get a page of JobPosts");
        Page<JobPostDTO> page = jobPostService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/job-posts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /job-posts/:id : get the "id" jobPost.
     *
     * @param id the id of the jobPostDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobPostDTO, or with status 404 (Not Found)
     */
    @GetMapping("/job-posts/{id}")
    @Timed
    public ResponseEntity<JobPostDTO> getJobPost(@PathVariable String id) {
        log.debug("REST request to get JobPost : {}", id);
        Optional<JobPostDTO> jobPostDTO = jobPostService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jobPostDTO);
    }

    /**
     * DELETE  /job-posts/:id : delete the "id" jobPost.
     *
     * @param id the id of the jobPostDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-posts/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobPost(@PathVariable String id) {
        log.debug("REST request to delete JobPost : {}", id);
        jobPostService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
