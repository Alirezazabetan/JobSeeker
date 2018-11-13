package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.HonorAndReward;
import ir.zabetan.job.repository.HonorAndRewardRepository;
import ir.zabetan.job.service.HonorAndRewardService;
import ir.zabetan.job.service.dto.HonorAndRewardDTO;
import ir.zabetan.job.service.mapper.HonorAndRewardMapper;
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
 * Test class for the HonorAndRewardResource REST controller.
 *
 * @see HonorAndRewardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class HonorAndRewardResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_ASSOCIATED_WITH = "AAAAAAAAAA";
    private static final String UPDATED_ASSOCIATED_WITH = "BBBBBBBBBB";

    private static final String DEFAULT_ISSUE = "AAAAAAAAAA";
    private static final String UPDATED_ISSUE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private HonorAndRewardRepository honorAndRewardRepository;


    @Autowired
    private HonorAndRewardMapper honorAndRewardMapper;
    

    @Autowired
    private HonorAndRewardService honorAndRewardService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restHonorAndRewardMockMvc;

    private HonorAndReward honorAndReward;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HonorAndRewardResource honorAndRewardResource = new HonorAndRewardResource(honorAndRewardService);
        this.restHonorAndRewardMockMvc = MockMvcBuilders.standaloneSetup(honorAndRewardResource)
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
    public static HonorAndReward createEntity() {
        HonorAndReward honorAndReward = new HonorAndReward()
            .title(DEFAULT_TITLE)
            .associatedWith(DEFAULT_ASSOCIATED_WITH)
            .issue(DEFAULT_ISSUE)
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION);
        return honorAndReward;
    }

    @Before
    public void initTest() {
        honorAndRewardRepository.deleteAll();
        honorAndReward = createEntity();
    }

    @Test
    public void createHonorAndReward() throws Exception {
        int databaseSizeBeforeCreate = honorAndRewardRepository.findAll().size();

        // Create the HonorAndReward
        HonorAndRewardDTO honorAndRewardDTO = honorAndRewardMapper.toDto(honorAndReward);
        restHonorAndRewardMockMvc.perform(post("/api/honor-and-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(honorAndRewardDTO)))
            .andExpect(status().isCreated());

        // Validate the HonorAndReward in the database
        List<HonorAndReward> honorAndRewardList = honorAndRewardRepository.findAll();
        assertThat(honorAndRewardList).hasSize(databaseSizeBeforeCreate + 1);
        HonorAndReward testHonorAndReward = honorAndRewardList.get(honorAndRewardList.size() - 1);
        assertThat(testHonorAndReward.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testHonorAndReward.getAssociatedWith()).isEqualTo(DEFAULT_ASSOCIATED_WITH);
        assertThat(testHonorAndReward.getIssue()).isEqualTo(DEFAULT_ISSUE);
        assertThat(testHonorAndReward.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testHonorAndReward.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createHonorAndRewardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = honorAndRewardRepository.findAll().size();

        // Create the HonorAndReward with an existing ID
        honorAndReward.setId("existing_id");
        HonorAndRewardDTO honorAndRewardDTO = honorAndRewardMapper.toDto(honorAndReward);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHonorAndRewardMockMvc.perform(post("/api/honor-and-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(honorAndRewardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HonorAndReward in the database
        List<HonorAndReward> honorAndRewardList = honorAndRewardRepository.findAll();
        assertThat(honorAndRewardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllHonorAndRewards() throws Exception {
        // Initialize the database
        honorAndRewardRepository.save(honorAndReward);

        // Get all the honorAndRewardList
        restHonorAndRewardMockMvc.perform(get("/api/honor-and-rewards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(honorAndReward.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].associatedWith").value(hasItem(DEFAULT_ASSOCIATED_WITH.toString())))
            .andExpect(jsonPath("$.[*].issue").value(hasItem(DEFAULT_ISSUE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    public void getHonorAndReward() throws Exception {
        // Initialize the database
        honorAndRewardRepository.save(honorAndReward);

        // Get the honorAndReward
        restHonorAndRewardMockMvc.perform(get("/api/honor-and-rewards/{id}", honorAndReward.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(honorAndReward.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.associatedWith").value(DEFAULT_ASSOCIATED_WITH.toString()))
            .andExpect(jsonPath("$.issue").value(DEFAULT_ISSUE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    public void getNonExistingHonorAndReward() throws Exception {
        // Get the honorAndReward
        restHonorAndRewardMockMvc.perform(get("/api/honor-and-rewards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHonorAndReward() throws Exception {
        // Initialize the database
        honorAndRewardRepository.save(honorAndReward);

        int databaseSizeBeforeUpdate = honorAndRewardRepository.findAll().size();

        // Update the honorAndReward
        HonorAndReward updatedHonorAndReward = honorAndRewardRepository.findById(honorAndReward.getId()).get();
        updatedHonorAndReward
            .title(UPDATED_TITLE)
            .associatedWith(UPDATED_ASSOCIATED_WITH)
            .issue(UPDATED_ISSUE)
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION);
        HonorAndRewardDTO honorAndRewardDTO = honorAndRewardMapper.toDto(updatedHonorAndReward);

        restHonorAndRewardMockMvc.perform(put("/api/honor-and-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(honorAndRewardDTO)))
            .andExpect(status().isOk());

        // Validate the HonorAndReward in the database
        List<HonorAndReward> honorAndRewardList = honorAndRewardRepository.findAll();
        assertThat(honorAndRewardList).hasSize(databaseSizeBeforeUpdate);
        HonorAndReward testHonorAndReward = honorAndRewardList.get(honorAndRewardList.size() - 1);
        assertThat(testHonorAndReward.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testHonorAndReward.getAssociatedWith()).isEqualTo(UPDATED_ASSOCIATED_WITH);
        assertThat(testHonorAndReward.getIssue()).isEqualTo(UPDATED_ISSUE);
        assertThat(testHonorAndReward.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testHonorAndReward.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingHonorAndReward() throws Exception {
        int databaseSizeBeforeUpdate = honorAndRewardRepository.findAll().size();

        // Create the HonorAndReward
        HonorAndRewardDTO honorAndRewardDTO = honorAndRewardMapper.toDto(honorAndReward);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHonorAndRewardMockMvc.perform(put("/api/honor-and-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(honorAndRewardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HonorAndReward in the database
        List<HonorAndReward> honorAndRewardList = honorAndRewardRepository.findAll();
        assertThat(honorAndRewardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteHonorAndReward() throws Exception {
        // Initialize the database
        honorAndRewardRepository.save(honorAndReward);

        int databaseSizeBeforeDelete = honorAndRewardRepository.findAll().size();

        // Get the honorAndReward
        restHonorAndRewardMockMvc.perform(delete("/api/honor-and-rewards/{id}", honorAndReward.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HonorAndReward> honorAndRewardList = honorAndRewardRepository.findAll();
        assertThat(honorAndRewardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HonorAndReward.class);
        HonorAndReward honorAndReward1 = new HonorAndReward();
        honorAndReward1.setId("id1");
        HonorAndReward honorAndReward2 = new HonorAndReward();
        honorAndReward2.setId(honorAndReward1.getId());
        assertThat(honorAndReward1).isEqualTo(honorAndReward2);
        honorAndReward2.setId("id2");
        assertThat(honorAndReward1).isNotEqualTo(honorAndReward2);
        honorAndReward1.setId(null);
        assertThat(honorAndReward1).isNotEqualTo(honorAndReward2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HonorAndRewardDTO.class);
        HonorAndRewardDTO honorAndRewardDTO1 = new HonorAndRewardDTO();
        honorAndRewardDTO1.setId("id1");
        HonorAndRewardDTO honorAndRewardDTO2 = new HonorAndRewardDTO();
        assertThat(honorAndRewardDTO1).isNotEqualTo(honorAndRewardDTO2);
        honorAndRewardDTO2.setId(honorAndRewardDTO1.getId());
        assertThat(honorAndRewardDTO1).isEqualTo(honorAndRewardDTO2);
        honorAndRewardDTO2.setId("id2");
        assertThat(honorAndRewardDTO1).isNotEqualTo(honorAndRewardDTO2);
        honorAndRewardDTO1.setId(null);
        assertThat(honorAndRewardDTO1).isNotEqualTo(honorAndRewardDTO2);
    }
}
