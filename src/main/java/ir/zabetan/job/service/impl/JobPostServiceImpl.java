package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.JobPostService;
import ir.zabetan.job.domain.JobPost;
import ir.zabetan.job.repository.JobPostRepository;
import ir.zabetan.job.service.dto.JobPostDTO;
import ir.zabetan.job.service.mapper.JobPostMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Optional;
/**
 * Service Implementation for managing JobPost.
 */
@Service
public class JobPostServiceImpl implements JobPostService {

    private final Logger log = LoggerFactory.getLogger(JobPostServiceImpl.class);

    private final JobPostRepository jobPostRepository;

    private final JobPostMapper jobPostMapper;

    public JobPostServiceImpl(JobPostRepository jobPostRepository, JobPostMapper jobPostMapper) {
        this.jobPostRepository = jobPostRepository;
        this.jobPostMapper = jobPostMapper;
    }

    /**
     * Save a jobPost.
     *
     * @param jobPostDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public JobPostDTO save(JobPostDTO jobPostDTO) {
        log.debug("Request to save JobPost : {}", jobPostDTO);
        JobPost jobPost = jobPostMapper.toEntity(jobPostDTO);
        jobPost = jobPostRepository.save(jobPost);
        return jobPostMapper.toDto(jobPost);
    }

    /**
     * Get all the jobPosts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<JobPostDTO> findAll(Pageable pageable) {
        log.debug("Request to get all JobPosts");
        return jobPostRepository.findAll(pageable)
            .map(jobPostMapper::toDto);
    }


    /**
     * Get one jobPost by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<JobPostDTO> findOne(String id) {
        log.debug("Request to get JobPost : {}", id);
        return jobPostRepository.findById(id)
            .map(jobPostMapper::toDto);
    }

    /**
     * Delete the jobPost by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete JobPost : {}", id);
        jobPostRepository.deleteById(id);
    }
}
