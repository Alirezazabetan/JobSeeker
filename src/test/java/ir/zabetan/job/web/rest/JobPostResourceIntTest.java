package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.JobPost;
import ir.zabetan.job.repository.JobPostRepository;
import ir.zabetan.job.service.JobPostService;
import ir.zabetan.job.service.dto.JobPostDTO;
import ir.zabetan.job.service.mapper.JobPostMapper;
import ir.zabetan.job.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static ir.zabetan.job.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JobPostResource REST controller.
 *
 * @see JobPostResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class JobPostResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPANY = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SHORT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_APPLICATION_URL = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_URL = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_WORKINGHOURS = "AAAAAAAAAA";
    private static final String UPDATED_WORKINGHOURS = "BBBBBBBBBB";

    private static final String DEFAULT_JOB_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_JOB_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_REQUERED_SKILLS = "AAAAAAAAAA";
    private static final String UPDATED_REQUERED_SKILLS = "BBBBBBBBBB";

    private static final String DEFAULT_COVER_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_COVER_IMAGE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private JobPostRepository jobPostRepository;


    @Autowired
    private JobPostMapper jobPostMapper;
    

    @Autowired
    private JobPostService jobPostService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restJobPostMockMvc;

    private JobPost jobPost;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobPostResource jobPostResource = new JobPostResource(jobPostService);
        this.restJobPostMockMvc = MockMvcBuilders.standaloneSetup(jobPostResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobPost createEntity() {
        JobPost jobPost = new JobPost()
            .title(DEFAULT_TITLE)
            .company(DEFAULT_COMPANY)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .shortDescription(DEFAULT_SHORT_DESCRIPTION)
            .applicationUrl(DEFAULT_APPLICATION_URL)
            .location(DEFAULT_LOCATION)
            .workinghours(DEFAULT_WORKINGHOURS)
            .jobType(DEFAULT_JOB_TYPE)
            .requeredSkills(DEFAULT_REQUERED_SKILLS)
            .coverImage(DEFAULT_COVER_IMAGE)
            .description(DEFAULT_DESCRIPTION);
        return jobPost;
    }

    @Before
    public void initTest() {
        jobPostRepository.deleteAll();
        jobPost = createEntity();
    }

    @Test
    public void createJobPost() throws Exception {
        int databaseSizeBeforeCreate = jobPostRepository.findAll().size();

        // Create the JobPost
        JobPostDTO jobPostDTO = jobPostMapper.toDto(jobPost);
        restJobPostMockMvc.perform(post("/api/job-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobPostDTO)))
            .andExpect(status().isCreated());

        // Validate the JobPost in the database
        List<JobPost> jobPostList = jobPostRepository.findAll();
        assertThat(jobPostList).hasSize(databaseSizeBeforeCreate + 1);
        JobPost testJobPost = jobPostList.get(jobPostList.size() - 1);
        assertThat(testJobPost.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testJobPost.getCompany()).isEqualTo(DEFAULT_COMPANY);
        assertThat(testJobPost.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testJobPost.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testJobPost.getShortDescription()).isEqualTo(DEFAULT_SHORT_DESCRIPTION);
        assertThat(testJobPost.getApplicationUrl()).isEqualTo(DEFAULT_APPLICATION_URL);
        assertThat(testJobPost.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testJobPost.getWorkinghours()).isEqualTo(DEFAULT_WORKINGHOURS);
        assertThat(testJobPost.getJobType()).isEqualTo(DEFAULT_JOB_TYPE);
        assertThat(testJobPost.getRequeredSkills()).isEqualTo(DEFAULT_REQUERED_SKILLS);
        assertThat(testJobPost.getCoverImage()).isEqualTo(DEFAULT_COVER_IMAGE);
        assertThat(testJobPost.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createJobPostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobPostRepository.findAll().size();

        // Create the JobPost with an existing ID
        jobPost.setId("existing_id");
        JobPostDTO jobPostDTO = jobPostMapper.toDto(jobPost);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobPostMockMvc.perform(post("/api/job-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobPostDTO)))
            .andExpect(status().isBadRequest());

        // Validate the JobPost in the database
        List<JobPost> jobPostList = jobPostRepository.findAll();
        assertThat(jobPostList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllJobPosts() throws Exception {
        // Initialize the database
        jobPostRepository.save(jobPost);

        // Get all the jobPostList
        restJobPostMockMvc.perform(get("/api/job-posts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobPost.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].company").value(hasItem(DEFAULT_COMPANY.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].shortDescription").value(hasItem(DEFAULT_SHORT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].applicationUrl").value(hasItem(DEFAULT_APPLICATION_URL.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].workinghours").value(hasItem(DEFAULT_WORKINGHOURS.toString())))
            .andExpect(jsonPath("$.[*].jobType").value(hasItem(DEFAULT_JOB_TYPE.toString())))
            .andExpect(jsonPath("$.[*].requeredSkills").value(hasItem(DEFAULT_REQUERED_SKILLS.toString())))
            .andExpect(jsonPath("$.[*].coverImage").value(hasItem(DEFAULT_COVER_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    public void getJobPost() throws Exception {
        // Initialize the database
        jobPostRepository.save(jobPost);

        // Get the jobPost
        restJobPostMockMvc.perform(get("/api/job-posts/{id}", jobPost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobPost.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.company").value(DEFAULT_COMPANY.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.shortDescription").value(DEFAULT_SHORT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.applicationUrl").value(DEFAULT_APPLICATION_URL.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.workinghours").value(DEFAULT_WORKINGHOURS.toString()))
            .andExpect(jsonPath("$.jobType").value(DEFAULT_JOB_TYPE.toString()))
            .andExpect(jsonPath("$.requeredSkills").value(DEFAULT_REQUERED_SKILLS.toString()))
            .andExpect(jsonPath("$.coverImage").value(DEFAULT_COVER_IMAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    public void getNonExistingJobPost() throws Exception {
        // Get the jobPost
        restJobPostMockMvc.perform(get("/api/job-posts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateJobPost() throws Exception {
        // Initialize the database
        jobPostRepository.save(jobPost);

        int databaseSizeBeforeUpdate = jobPostRepository.findAll().size();

        // Update the jobPost
        JobPost updatedJobPost = jobPostRepository.findById(jobPost.getId()).get();
        updatedJobPost
            .title(UPDATED_TITLE)
            .company(UPDATED_COMPANY)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .shortDescription(UPDATED_SHORT_DESCRIPTION)
            .applicationUrl(UPDATED_APPLICATION_URL)
            .location(UPDATED_LOCATION)
            .workinghours(UPDATED_WORKINGHOURS)
            .jobType(UPDATED_JOB_TYPE)
            .requeredSkills(UPDATED_REQUERED_SKILLS)
            .coverImage(UPDATED_COVER_IMAGE)
            .description(UPDATED_DESCRIPTION);
        JobPostDTO jobPostDTO = jobPostMapper.toDto(updatedJobPost);

        restJobPostMockMvc.perform(put("/api/job-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobPostDTO)))
            .andExpect(status().isOk());

        // Validate the JobPost in the database
        List<JobPost> jobPostList = jobPostRepository.findAll();
        assertThat(jobPostList).hasSize(databaseSizeBeforeUpdate);
        JobPost testJobPost = jobPostList.get(jobPostList.size() - 1);
        assertThat(testJobPost.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testJobPost.getCompany()).isEqualTo(UPDATED_COMPANY);
        assertThat(testJobPost.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testJobPost.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testJobPost.getShortDescription()).isEqualTo(UPDATED_SHORT_DESCRIPTION);
        assertThat(testJobPost.getApplicationUrl()).isEqualTo(UPDATED_APPLICATION_URL);
        assertThat(testJobPost.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testJobPost.getWorkinghours()).isEqualTo(UPDATED_WORKINGHOURS);
        assertThat(testJobPost.getJobType()).isEqualTo(UPDATED_JOB_TYPE);
        assertThat(testJobPost.getRequeredSkills()).isEqualTo(UPDATED_REQUERED_SKILLS);
        assertThat(testJobPost.getCoverImage()).isEqualTo(UPDATED_COVER_IMAGE);
        assertThat(testJobPost.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingJobPost() throws Exception {
        int databaseSizeBeforeUpdate = jobPostRepository.findAll().size();

        // Create the JobPost
        JobPostDTO jobPostDTO = jobPostMapper.toDto(jobPost);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobPostMockMvc.perform(put("/api/job-posts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobPostDTO)))
            .andExpect(status().isBadRequest());

        // Validate the JobPost in the database
        List<JobPost> jobPostList = jobPostRepository.findAll();
        assertThat(jobPostList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteJobPost() throws Exception {
        // Initialize the database
        jobPostRepository.save(jobPost);

        int databaseSizeBeforeDelete = jobPostRepository.findAll().size();

        // Get the jobPost
        restJobPostMockMvc.perform(delete("/api/job-posts/{id}", jobPost.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobPost> jobPostList = jobPostRepository.findAll();
        assertThat(jobPostList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobPost.class);
        JobPost jobPost1 = new JobPost();
        jobPost1.setId("id1");
        JobPost jobPost2 = new JobPost();
        jobPost2.setId(jobPost1.getId());
        assertThat(jobPost1).isEqualTo(jobPost2);
        jobPost2.setId("id2");
        assertThat(jobPost1).isNotEqualTo(jobPost2);
        jobPost1.setId(null);
        assertThat(jobPost1).isNotEqualTo(jobPost2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobPostDTO.class);
        JobPostDTO jobPostDTO1 = new JobPostDTO();
        jobPostDTO1.setId("id1");
        JobPostDTO jobPostDTO2 = new JobPostDTO();
        assertThat(jobPostDTO1).isNotEqualTo(jobPostDTO2);
        jobPostDTO2.setId(jobPostDTO1.getId());
        assertThat(jobPostDTO1).isEqualTo(jobPostDTO2);
        jobPostDTO2.setId("id2");
        assertThat(jobPostDTO1).isNotEqualTo(jobPostDTO2);
        jobPostDTO1.setId(null);
        assertThat(jobPostDTO1).isNotEqualTo(jobPostDTO2);
    }
}
