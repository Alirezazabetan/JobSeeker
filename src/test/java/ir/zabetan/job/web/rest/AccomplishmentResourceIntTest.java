package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.Accomplishment;
import ir.zabetan.job.repository.AccomplishmentRepository;
import ir.zabetan.job.service.AccomplishmentService;
import ir.zabetan.job.service.dto.AccomplishmentDTO;
import ir.zabetan.job.service.mapper.AccomplishmentMapper;
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

import java.util.List;


import static ir.zabetan.job.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccomplishmentResource REST controller.
 *
 * @see AccomplishmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class AccomplishmentResourceIntTest {

    private static final String DEFAULT_PUBLICATION = "AAAAAAAAAA";
    private static final String UPDATED_PUBLICATION = "BBBBBBBBBB";

    private static final String DEFAULT_CERTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_CERTIFICATION = "BBBBBBBBBB";

    private static final String DEFAULT_PATENT = "AAAAAAAAAA";
    private static final String UPDATED_PATENT = "BBBBBBBBBB";

    private static final String DEFAULT_COURSE = "AAAAAAAAAA";
    private static final String UPDATED_COURSE = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT = "BBBBBBBBBB";

    private static final String DEFAULT_HONOR_AND_REWARD = "AAAAAAAAAA";
    private static final String UPDATED_HONOR_AND_REWARD = "BBBBBBBBBB";

    private static final String DEFAULT_TEST_SCORE = "AAAAAAAAAA";
    private static final String UPDATED_TEST_SCORE = "BBBBBBBBBB";

    private static final String DEFAULT_LANGUAGE = "AAAAAAAAAA";
    private static final String UPDATED_LANGUAGE = "BBBBBBBBBB";

    private static final String DEFAULT_ORGANIZATION = "AAAAAAAAAA";
    private static final String UPDATED_ORGANIZATION = "BBBBBBBBBB";

    @Autowired
    private AccomplishmentRepository accomplishmentRepository;


    @Autowired
    private AccomplishmentMapper accomplishmentMapper;
    

    @Autowired
    private AccomplishmentService accomplishmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAccomplishmentMockMvc;

    private Accomplishment accomplishment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccomplishmentResource accomplishmentResource = new AccomplishmentResource(accomplishmentService);
        this.restAccomplishmentMockMvc = MockMvcBuilders.standaloneSetup(accomplishmentResource)
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
    public static Accomplishment createEntity() {
        Accomplishment accomplishment = new Accomplishment()
            .publication(DEFAULT_PUBLICATION)
            .certification(DEFAULT_CERTIFICATION)
            .patent(DEFAULT_PATENT)
            .course(DEFAULT_COURSE)
            .project(DEFAULT_PROJECT)
            .honorAndReward(DEFAULT_HONOR_AND_REWARD)
            .testScore(DEFAULT_TEST_SCORE)
            .language(DEFAULT_LANGUAGE)
            .organization(DEFAULT_ORGANIZATION);
        return accomplishment;
    }

    @Before
    public void initTest() {
        accomplishmentRepository.deleteAll();
        accomplishment = createEntity();
    }

    @Test
    public void createAccomplishment() throws Exception {
        int databaseSizeBeforeCreate = accomplishmentRepository.findAll().size();

        // Create the Accomplishment
        AccomplishmentDTO accomplishmentDTO = accomplishmentMapper.toDto(accomplishment);
        restAccomplishmentMockMvc.perform(post("/api/accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accomplishmentDTO)))
            .andExpect(status().isCreated());

        // Validate the Accomplishment in the database
        List<Accomplishment> accomplishmentList = accomplishmentRepository.findAll();
        assertThat(accomplishmentList).hasSize(databaseSizeBeforeCreate + 1);
        Accomplishment testAccomplishment = accomplishmentList.get(accomplishmentList.size() - 1);
        assertThat(testAccomplishment.getPublication()).isEqualTo(DEFAULT_PUBLICATION);
        assertThat(testAccomplishment.getCertification()).isEqualTo(DEFAULT_CERTIFICATION);
        assertThat(testAccomplishment.getPatent()).isEqualTo(DEFAULT_PATENT);
        assertThat(testAccomplishment.getCourse()).isEqualTo(DEFAULT_COURSE);
        assertThat(testAccomplishment.getProject()).isEqualTo(DEFAULT_PROJECT);
        assertThat(testAccomplishment.getHonorAndReward()).isEqualTo(DEFAULT_HONOR_AND_REWARD);
        assertThat(testAccomplishment.getTestScore()).isEqualTo(DEFAULT_TEST_SCORE);
        assertThat(testAccomplishment.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testAccomplishment.getOrganization()).isEqualTo(DEFAULT_ORGANIZATION);
    }

    @Test
    public void createAccomplishmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accomplishmentRepository.findAll().size();

        // Create the Accomplishment with an existing ID
        accomplishment.setId("existing_id");
        AccomplishmentDTO accomplishmentDTO = accomplishmentMapper.toDto(accomplishment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccomplishmentMockMvc.perform(post("/api/accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accomplishmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Accomplishment in the database
        List<Accomplishment> accomplishmentList = accomplishmentRepository.findAll();
        assertThat(accomplishmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAccomplishments() throws Exception {
        // Initialize the database
        accomplishmentRepository.save(accomplishment);

        // Get all the accomplishmentList
        restAccomplishmentMockMvc.perform(get("/api/accomplishments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accomplishment.getId())))
            .andExpect(jsonPath("$.[*].publication").value(hasItem(DEFAULT_PUBLICATION.toString())))
            .andExpect(jsonPath("$.[*].certification").value(hasItem(DEFAULT_CERTIFICATION.toString())))
            .andExpect(jsonPath("$.[*].patent").value(hasItem(DEFAULT_PATENT.toString())))
            .andExpect(jsonPath("$.[*].course").value(hasItem(DEFAULT_COURSE.toString())))
            .andExpect(jsonPath("$.[*].project").value(hasItem(DEFAULT_PROJECT.toString())))
            .andExpect(jsonPath("$.[*].honorAndReward").value(hasItem(DEFAULT_HONOR_AND_REWARD.toString())))
            .andExpect(jsonPath("$.[*].testScore").value(hasItem(DEFAULT_TEST_SCORE.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].organization").value(hasItem(DEFAULT_ORGANIZATION.toString())));
    }
    

    @Test
    public void getAccomplishment() throws Exception {
        // Initialize the database
        accomplishmentRepository.save(accomplishment);

        // Get the accomplishment
        restAccomplishmentMockMvc.perform(get("/api/accomplishments/{id}", accomplishment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accomplishment.getId()))
            .andExpect(jsonPath("$.publication").value(DEFAULT_PUBLICATION.toString()))
            .andExpect(jsonPath("$.certification").value(DEFAULT_CERTIFICATION.toString()))
            .andExpect(jsonPath("$.patent").value(DEFAULT_PATENT.toString()))
            .andExpect(jsonPath("$.course").value(DEFAULT_COURSE.toString()))
            .andExpect(jsonPath("$.project").value(DEFAULT_PROJECT.toString()))
            .andExpect(jsonPath("$.honorAndReward").value(DEFAULT_HONOR_AND_REWARD.toString()))
            .andExpect(jsonPath("$.testScore").value(DEFAULT_TEST_SCORE.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.organization").value(DEFAULT_ORGANIZATION.toString()));
    }
    @Test
    public void getNonExistingAccomplishment() throws Exception {
        // Get the accomplishment
        restAccomplishmentMockMvc.perform(get("/api/accomplishments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAccomplishment() throws Exception {
        // Initialize the database
        accomplishmentRepository.save(accomplishment);

        int databaseSizeBeforeUpdate = accomplishmentRepository.findAll().size();

        // Update the accomplishment
        Accomplishment updatedAccomplishment = accomplishmentRepository.findById(accomplishment.getId()).get();
        updatedAccomplishment
            .publication(UPDATED_PUBLICATION)
            .certification(UPDATED_CERTIFICATION)
            .patent(UPDATED_PATENT)
            .course(UPDATED_COURSE)
            .project(UPDATED_PROJECT)
            .honorAndReward(UPDATED_HONOR_AND_REWARD)
            .testScore(UPDATED_TEST_SCORE)
            .language(UPDATED_LANGUAGE)
            .organization(UPDATED_ORGANIZATION);
        AccomplishmentDTO accomplishmentDTO = accomplishmentMapper.toDto(updatedAccomplishment);

        restAccomplishmentMockMvc.perform(put("/api/accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accomplishmentDTO)))
            .andExpect(status().isOk());

        // Validate the Accomplishment in the database
        List<Accomplishment> accomplishmentList = accomplishmentRepository.findAll();
        assertThat(accomplishmentList).hasSize(databaseSizeBeforeUpdate);
        Accomplishment testAccomplishment = accomplishmentList.get(accomplishmentList.size() - 1);
        assertThat(testAccomplishment.getPublication()).isEqualTo(UPDATED_PUBLICATION);
        assertThat(testAccomplishment.getCertification()).isEqualTo(UPDATED_CERTIFICATION);
        assertThat(testAccomplishment.getPatent()).isEqualTo(UPDATED_PATENT);
        assertThat(testAccomplishment.getCourse()).isEqualTo(UPDATED_COURSE);
        assertThat(testAccomplishment.getProject()).isEqualTo(UPDATED_PROJECT);
        assertThat(testAccomplishment.getHonorAndReward()).isEqualTo(UPDATED_HONOR_AND_REWARD);
        assertThat(testAccomplishment.getTestScore()).isEqualTo(UPDATED_TEST_SCORE);
        assertThat(testAccomplishment.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testAccomplishment.getOrganization()).isEqualTo(UPDATED_ORGANIZATION);
    }

    @Test
    public void updateNonExistingAccomplishment() throws Exception {
        int databaseSizeBeforeUpdate = accomplishmentRepository.findAll().size();

        // Create the Accomplishment
        AccomplishmentDTO accomplishmentDTO = accomplishmentMapper.toDto(accomplishment);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccomplishmentMockMvc.perform(put("/api/accomplishments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accomplishmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Accomplishment in the database
        List<Accomplishment> accomplishmentList = accomplishmentRepository.findAll();
        assertThat(accomplishmentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAccomplishment() throws Exception {
        // Initialize the database
        accomplishmentRepository.save(accomplishment);

        int databaseSizeBeforeDelete = accomplishmentRepository.findAll().size();

        // Get the accomplishment
        restAccomplishmentMockMvc.perform(delete("/api/accomplishments/{id}", accomplishment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Accomplishment> accomplishmentList = accomplishmentRepository.findAll();
        assertThat(accomplishmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Accomplishment.class);
        Accomplishment accomplishment1 = new Accomplishment();
        accomplishment1.setId("id1");
        Accomplishment accomplishment2 = new Accomplishment();
        accomplishment2.setId(accomplishment1.getId());
        assertThat(accomplishment1).isEqualTo(accomplishment2);
        accomplishment2.setId("id2");
        assertThat(accomplishment1).isNotEqualTo(accomplishment2);
        accomplishment1.setId(null);
        assertThat(accomplishment1).isNotEqualTo(accomplishment2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccomplishmentDTO.class);
        AccomplishmentDTO accomplishmentDTO1 = new AccomplishmentDTO();
        accomplishmentDTO1.setId("id1");
        AccomplishmentDTO accomplishmentDTO2 = new AccomplishmentDTO();
        assertThat(accomplishmentDTO1).isNotEqualTo(accomplishmentDTO2);
        accomplishmentDTO2.setId(accomplishmentDTO1.getId());
        assertThat(accomplishmentDTO1).isEqualTo(accomplishmentDTO2);
        accomplishmentDTO2.setId("id2");
        assertThat(accomplishmentDTO1).isNotEqualTo(accomplishmentDTO2);
        accomplishmentDTO1.setId(null);
        assertThat(accomplishmentDTO1).isNotEqualTo(accomplishmentDTO2);
    }
}
