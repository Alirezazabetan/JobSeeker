package ir.zabetan.job.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.zabetan.job.service.HonorAndRewardService;
import ir.zabetan.job.web.rest.errors.BadRequestAlertException;
import ir.zabetan.job.web.rest.util.HeaderUtil;
import ir.zabetan.job.service.dto.HonorAndRewardDTO;
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
 * REST controller for managing HonorAndReward.
 */
@RestController
@RequestMapping("/api")
public class HonorAndRewardResource {

    private final Logger log = LoggerFactory.getLogger(HonorAndRewardResource.class);

    private static final String ENTITY_NAME = "honorAndReward";

    private final HonorAndRewardService honorAndRewardService;

    public HonorAndRewardResource(HonorAndRewardService honorAndRewardService) {
        this.honorAndRewardService = honorAndRewardService;
    }

    /**
     * POST  /honor-and-rewards : Create a new honorAndReward.
     *
     * @param honorAndRewardDTO the honorAndRewardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new honorAndRewardDTO, or with status 400 (Bad Request) if the honorAndReward has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/honor-and-rewards")
    @Timed
    public ResponseEntity<HonorAndRewardDTO> createHonorAndReward(@RequestBody HonorAndRewardDTO honorAndRewardDTO) throws URISyntaxException {
        log.debug("REST request to save HonorAndReward : {}", honorAndRewardDTO);
        if (honorAndRewardDTO.getId() != null) {
            throw new BadRequestAlertException("A new honorAndReward cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HonorAndRewardDTO result = honorAndRewardService.save(honorAndRewardDTO);
        return ResponseEntity.created(new URI("/api/honor-and-rewards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /honor-and-rewards : Updates an existing honorAndReward.
     *
     * @param honorAndRewardDTO the honorAndRewardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated honorAndRewardDTO,
     * or with status 400 (Bad Request) if the honorAndRewardDTO is not valid,
     * or with status 500 (Internal Server Error) if the honorAndRewardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/honor-and-rewards")
    @Timed
    public ResponseEntity<HonorAndRewardDTO> updateHonorAndReward(@RequestBody HonorAndRewardDTO honorAndRewardDTO) throws URISyntaxException {
        log.debug("REST request to update HonorAndReward : {}", honorAndRewardDTO);
        if (honorAndRewardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HonorAndRewardDTO result = honorAndRewardService.save(honorAndRewardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, honorAndRewardDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /honor-and-rewards : get all the honorAndRewards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of honorAndRewards in body
     */
    @GetMapping("/honor-and-rewards")
    @Timed
    public List<HonorAndRewardDTO> getAllHonorAndRewards() {
        log.debug("REST request to get all HonorAndRewards");
        return honorAndRewardService.findAll();
    }

    /**
     * GET  /honor-and-rewards/:id : get the "id" honorAndReward.
     *
     * @param id the id of the honorAndRewardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the honorAndRewardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/honor-and-rewards/{id}")
    @Timed
    public ResponseEntity<HonorAndRewardDTO> getHonorAndReward(@PathVariable String id) {
        log.debug("REST request to get HonorAndReward : {}", id);
        Optional<HonorAndRewardDTO> honorAndRewardDTO = honorAndRewardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(honorAndRewardDTO);
    }

    /**
     * DELETE  /honor-and-rewards/:id : delete the "id" honorAndReward.
     *
     * @param id the id of the honorAndRewardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/honor-and-rewards/{id}")
    @Timed
    public ResponseEntity<Void> deleteHonorAndReward(@PathVariable String id) {
        log.debug("REST request to delete HonorAndReward : {}", id);
        honorAndRewardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
