package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.TestScore;
import ir.zabetan.job.repository.TestScoreRepository;
import ir.zabetan.job.service.TestScoreService;
import ir.zabetan.job.service.dto.TestScoreDTO;
import ir.zabetan.job.service.mapper.TestScoreMapper;
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
 * Test class for the TestScoreResource REST controller.
 *
 * @see TestScoreResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class TestScoreResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ASSOCIATED_WITH = "AAAAAAAAAA";
    private static final String UPDATED_ASSOCIATED_WITH = "BBBBBBBBBB";

    private static final Float DEFAULT_SCORE = 1F;
    private static final Float UPDATED_SCORE = 2F;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TestScoreRepository testScoreRepository;


    @Autowired
    private TestScoreMapper testScoreMapper;
    

    @Autowired
    private TestScoreService testScoreService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restTestScoreMockMvc;

    private TestScore testScore;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TestScoreResource testScoreResource = new TestScoreResource(testScoreService);
        this.restTestScoreMockMvc = MockMvcBuilders.standaloneSetup(testScoreResource)
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
    public static TestScore createEntity() {
        TestScore testScore = new TestScore()
            .name(DEFAULT_NAME)
            .associatedWith(DEFAULT_ASSOCIATED_WITH)
            .score(DEFAULT_SCORE)
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION);
        return testScore;
    }

    @Before
    public void initTest() {
        testScoreRepository.deleteAll();
        testScore = createEntity();
    }

    @Test
    public void createTestScore() throws Exception {
        int databaseSizeBeforeCreate = testScoreRepository.findAll().size();

        // Create the TestScore
        TestScoreDTO testScoreDTO = testScoreMapper.toDto(testScore);
        restTestScoreMockMvc.perform(post("/api/test-scores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testScoreDTO)))
            .andExpect(status().isCreated());

        // Validate the TestScore in the database
        List<TestScore> testScoreList = testScoreRepository.findAll();
        assertThat(testScoreList).hasSize(databaseSizeBeforeCreate + 1);
        TestScore testTestScore = testScoreList.get(testScoreList.size() - 1);
        assertThat(testTestScore.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTestScore.getAssociatedWith()).isEqualTo(DEFAULT_ASSOCIATED_WITH);
        assertThat(testTestScore.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testTestScore.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTestScore.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createTestScoreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testScoreRepository.findAll().size();

        // Create the TestScore with an existing ID
        testScore.setId("existing_id");
        TestScoreDTO testScoreDTO = testScoreMapper.toDto(testScore);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestScoreMockMvc.perform(post("/api/test-scores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testScoreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestScore in the database
        List<TestScore> testScoreList = testScoreRepository.findAll();
        assertThat(testScoreList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllTestScores() throws Exception {
        // Initialize the database
        testScoreRepository.save(testScore);

        // Get all the testScoreList
        restTestScoreMockMvc.perform(get("/api/test-scores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testScore.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].associatedWith").value(hasItem(DEFAULT_ASSOCIATED_WITH.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    public void getTestScore() throws Exception {
        // Initialize the database
        testScoreRepository.save(testScore);

        // Get the testScore
        restTestScoreMockMvc.perform(get("/api/test-scores/{id}", testScore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testScore.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.associatedWith").value(DEFAULT_ASSOCIATED_WITH.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE.doubleValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    public void getNonExistingTestScore() throws Exception {
        // Get the testScore
        restTestScoreMockMvc.perform(get("/api/test-scores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTestScore() throws Exception {
        // Initialize the database
        testScoreRepository.save(testScore);

        int databaseSizeBeforeUpdate = testScoreRepository.findAll().size();

        // Update the testScore
        TestScore updatedTestScore = testScoreRepository.findById(testScore.getId()).get();
        updatedTestScore
            .name(UPDATED_NAME)
            .associatedWith(UPDATED_ASSOCIATED_WITH)
            .score(UPDATED_SCORE)
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION);
        TestScoreDTO testScoreDTO = testScoreMapper.toDto(updatedTestScore);

        restTestScoreMockMvc.perform(put("/api/test-scores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testScoreDTO)))
            .andExpect(status().isOk());

        // Validate the TestScore in the database
        List<TestScore> testScoreList = testScoreRepository.findAll();
        assertThat(testScoreList).hasSize(databaseSizeBeforeUpdate);
        TestScore testTestScore = testScoreList.get(testScoreList.size() - 1);
        assertThat(testTestScore.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTestScore.getAssociatedWith()).isEqualTo(UPDATED_ASSOCIATED_WITH);
        assertThat(testTestScore.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testTestScore.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTestScore.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingTestScore() throws Exception {
        int databaseSizeBeforeUpdate = testScoreRepository.findAll().size();

        // Create the TestScore
        TestScoreDTO testScoreDTO = testScoreMapper.toDto(testScore);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestScoreMockMvc.perform(put("/api/test-scores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testScoreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TestScore in the database
        List<TestScore> testScoreList = testScoreRepository.findAll();
        assertThat(testScoreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTestScore() throws Exception {
        // Initialize the database
        testScoreRepository.save(testScore);

        int databaseSizeBeforeDelete = testScoreRepository.findAll().size();

        // Get the testScore
        restTestScoreMockMvc.perform(delete("/api/test-scores/{id}", testScore.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestScore> testScoreList = testScoreRepository.findAll();
        assertThat(testScoreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestScore.class);
        TestScore testScore1 = new TestScore();
        testScore1.setId("id1");
        TestScore testScore2 = new TestScore();
        testScore2.setId(testScore1.getId());
        assertThat(testScore1).isEqualTo(testScore2);
        testScore2.setId("id2");
        assertThat(testScore1).isNotEqualTo(testScore2);
        testScore1.setId(null);
        assertThat(testScore1).isNotEqualTo(testScore2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestScoreDTO.class);
        TestScoreDTO testScoreDTO1 = new TestScoreDTO();
        testScoreDTO1.setId("id1");
        TestScoreDTO testScoreDTO2 = new TestScoreDTO();
        assertThat(testScoreDTO1).isNotEqualTo(testScoreDTO2);
        testScoreDTO2.setId(testScoreDTO1.getId());
        assertThat(testScoreDTO1).isEqualTo(testScoreDTO2);
        testScoreDTO2.setId("id2");
        assertThat(testScoreDTO1).isNotEqualTo(testScoreDTO2);
        testScoreDTO1.setId(null);
        assertThat(testScoreDTO1).isNotEqualTo(testScoreDTO2);
    }
}
