package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.Individual;
import ir.zabetan.job.repository.IndividualRepository;
import ir.zabetan.job.service.IndividualService;
import ir.zabetan.job.service.dto.IndividualDTO;
import ir.zabetan.job.service.mapper.IndividualMapper;
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
 * Test class for the IndividualResource REST controller.
 *
 * @see IndividualResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class IndividualResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_MOBILE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_BIRTH_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BIRTH_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_JOB_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_JOB_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_WEB_SITE = "AAAAAAAAAA";
    private static final String UPDATED_WEB_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_SOCIAL_UR_LS = "AAAAAAAAAA";
    private static final String UPDATED_SOCIAL_UR_LS = "BBBBBBBBBB";

    private static final String DEFAULT_SKILLS = "AAAAAAAAAA";
    private static final String UPDATED_SKILLS = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATIONS = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATIONS = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_EXPRIENCES = "AAAAAAAAAA";
    private static final String UPDATED_WORK_EXPRIENCES = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOMPLISHMENT = "AAAAAAAAAA";
    private static final String UPDATED_ACCOMPLISHMENT = "BBBBBBBBBB";

    @Autowired
    private IndividualRepository individualRepository;


    @Autowired
    private IndividualMapper individualMapper;
    

    @Autowired
    private IndividualService individualService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restIndividualMockMvc;

    private Individual individual;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IndividualResource individualResource = new IndividualResource(individualService);
        this.restIndividualMockMvc = MockMvcBuilders.standaloneSetup(individualResource)
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
    public static Individual createEntity() {
        Individual individual = new Individual()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .mobileNumber(DEFAULT_MOBILE_NUMBER)
            .birthDate(DEFAULT_BIRTH_DATE)
            .address(DEFAULT_ADDRESS)
            .jobTitle(DEFAULT_JOB_TITLE)
            .shortDescription(DEFAULT_SHORT_DESCRIPTION)
            .webSite(DEFAULT_WEB_SITE)
            .socialURLs(DEFAULT_SOCIAL_UR_LS)
            .skills(DEFAULT_SKILLS)
            .educations(DEFAULT_EDUCATIONS)
            .workExpriences(DEFAULT_WORK_EXPRIENCES)
            .accomplishment(DEFAULT_ACCOMPLISHMENT);
        return individual;
    }

    @Before
    public void initTest() {
        individualRepository.deleteAll();
        individual = createEntity();
    }

    @Test
    public void createIndividual() throws Exception {
        int databaseSizeBeforeCreate = individualRepository.findAll().size();

        // Create the Individual
        IndividualDTO individualDTO = individualMapper.toDto(individual);
        restIndividualMockMvc.perform(post("/api/individuals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(individualDTO)))
            .andExpect(status().isCreated());

        // Validate the Individual in the database
        List<Individual> individualList = individualRepository.findAll();
        assertThat(individualList).hasSize(databaseSizeBeforeCreate + 1);
        Individual testIndividual = individualList.get(individualList.size() - 1);
        assertThat(testIndividual.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testIndividual.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testIndividual.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testIndividual.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testIndividual.getMobileNumber()).isEqualTo(DEFAULT_MOBILE_NUMBER);
        assertThat(testIndividual.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testIndividual.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testIndividual.getJobTitle()).isEqualTo(DEFAULT_JOB_TITLE);
        assertThat(testIndividual.getShortDescription()).isEqualTo(DEFAULT_SHORT_DESCRIPTION);
        assertThat(testIndividual.getWebSite()).isEqualTo(DEFAULT_WEB_SITE);
        assertThat(testIndividual.getSocialURLs()).isEqualTo(DEFAULT_SOCIAL_UR_LS);
        assertThat(testIndividual.getSkills()).isEqualTo(DEFAULT_SKILLS);
        assertThat(testIndividual.getEducations()).isEqualTo(DEFAULT_EDUCATIONS);
        assertThat(testIndividual.getWorkExpriences()).isEqualTo(DEFAULT_WORK_EXPRIENCES);
        assertThat(testIndividual.getAccomplishment()).isEqualTo(DEFAULT_ACCOMPLISHMENT);
    }

    @Test
    public void createIndividualWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = individualRepository.findAll().size();

        // Create the Individual with an existing ID
        individual.setId("existing_id");
        IndividualDTO individualDTO = individualMapper.toDto(individual);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndividualMockMvc.perform(post("/api/individuals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(individualDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Individual in the database
        List<Individual> individualList = individualRepository.findAll();
        assertThat(individualList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllIndividuals() throws Exception {
        // Initialize the database
        individualRepository.save(individual);

        // Get all the individualList
        restIndividualMockMvc.perform(get("/api/individuals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(individual.getId())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].mobileNumber").value(hasItem(DEFAULT_MOBILE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].jobTitle").value(hasItem(DEFAULT_JOB_TITLE.toString())))
            .andExpect(jsonPath("$.[*].shortDescription").value(hasItem(DEFAULT_SHORT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].webSite").value(hasItem(DEFAULT_WEB_SITE.toString())))
            .andExpect(jsonPath("$.[*].socialURLs").value(hasItem(DEFAULT_SOCIAL_UR_LS.toString())))
            .andExpect(jsonPath("$.[*].skills").value(hasItem(DEFAULT_SKILLS.toString())))
            .andExpect(jsonPath("$.[*].educations").value(hasItem(DEFAULT_EDUCATIONS.toString())))
            .andExpect(jsonPath("$.[*].workExpriences").value(hasItem(DEFAULT_WORK_EXPRIENCES.toString())))
            .andExpect(jsonPath("$.[*].accomplishment").value(hasItem(DEFAULT_ACCOMPLISHMENT.toString())));
    }
    

    @Test
    public void getIndividual() throws Exception {
        // Initialize the database
        individualRepository.save(individual);

        // Get the individual
        restIndividualMockMvc.perform(get("/api/individuals/{id}", individual.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(individual.getId()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()))
            .andExpect(jsonPath("$.mobileNumber").value(DEFAULT_MOBILE_NUMBER.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.jobTitle").value(DEFAULT_JOB_TITLE.toString()))
            .andExpect(jsonPath("$.shortDescription").value(DEFAULT_SHORT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.webSite").value(DEFAULT_WEB_SITE.toString()))
            .andExpect(jsonPath("$.socialURLs").value(DEFAULT_SOCIAL_UR_LS.toString()))
            .andExpect(jsonPath("$.skills").value(DEFAULT_SKILLS.toString()))
            .andExpect(jsonPath("$.educations").value(DEFAULT_EDUCATIONS.toString()))
            .andExpect(jsonPath("$.workExpriences").value(DEFAULT_WORK_EXPRIENCES.toString()))
            .andExpect(jsonPath("$.accomplishment").value(DEFAULT_ACCOMPLISHMENT.toString()));
    }
    @Test
    public void getNonExistingIndividual() throws Exception {
        // Get the individual
        restIndividualMockMvc.perform(get("/api/individuals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIndividual() throws Exception {
        // Initialize the database
        individualRepository.save(individual);

        int databaseSizeBeforeUpdate = individualRepository.findAll().size();

        // Update the individual
        Individual updatedIndividual = individualRepository.findById(individual.getId()).get();
        updatedIndividual
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .mobileNumber(UPDATED_MOBILE_NUMBER)
            .birthDate(UPDATED_BIRTH_DATE)
            .address(UPDATED_ADDRESS)
            .jobTitle(UPDATED_JOB_TITLE)
            .shortDescription(UPDATED_SHORT_DESCRIPTION)
            .webSite(UPDATED_WEB_SITE)
            .socialURLs(UPDATED_SOCIAL_UR_LS)
            .skills(UPDATED_SKILLS)
            .educations(UPDATED_EDUCATIONS)
            .workExpriences(UPDATED_WORK_EXPRIENCES)
            .accomplishment(UPDATED_ACCOMPLISHMENT);
        IndividualDTO individualDTO = individualMapper.toDto(updatedIndividual);

        restIndividualMockMvc.perform(put("/api/individuals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(individualDTO)))
            .andExpect(status().isOk());

        // Validate the Individual in the database
        List<Individual> individualList = individualRepository.findAll();
        assertThat(individualList).hasSize(databaseSizeBeforeUpdate);
        Individual testIndividual = individualList.get(individualList.size() - 1);
        assertThat(testIndividual.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testIndividual.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testIndividual.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testIndividual.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testIndividual.getMobileNumber()).isEqualTo(UPDATED_MOBILE_NUMBER);
        assertThat(testIndividual.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testIndividual.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testIndividual.getJobTitle()).isEqualTo(UPDATED_JOB_TITLE);
        assertThat(testIndividual.getShortDescription()).isEqualTo(UPDATED_SHORT_DESCRIPTION);
        assertThat(testIndividual.getWebSite()).isEqualTo(UPDATED_WEB_SITE);
        assertThat(testIndividual.getSocialURLs()).isEqualTo(UPDATED_SOCIAL_UR_LS);
        assertThat(testIndividual.getSkills()).isEqualTo(UPDATED_SKILLS);
        assertThat(testIndividual.getEducations()).isEqualTo(UPDATED_EDUCATIONS);
        assertThat(testIndividual.getWorkExpriences()).isEqualTo(UPDATED_WORK_EXPRIENCES);
        assertThat(testIndividual.getAccomplishment()).isEqualTo(UPDATED_ACCOMPLISHMENT);
    }

    @Test
    public void updateNonExistingIndividual() throws Exception {
        int databaseSizeBeforeUpdate = individualRepository.findAll().size();

        // Create the Individual
        IndividualDTO individualDTO = individualMapper.toDto(individual);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIndividualMockMvc.perform(put("/api/individuals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(individualDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Individual in the database
        List<Individual> individualList = individualRepository.findAll();
        assertThat(individualList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIndividual() throws Exception {
        // Initialize the database
        individualRepository.save(individual);

        int databaseSizeBeforeDelete = individualRepository.findAll().size();

        // Get the individual
        restIndividualMockMvc.perform(delete("/api/individuals/{id}", individual.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Individual> individualList = individualRepository.findAll();
        assertThat(individualList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Individual.class);
        Individual individual1 = new Individual();
        individual1.setId("id1");
        Individual individual2 = new Individual();
        individual2.setId(individual1.getId());
        assertThat(individual1).isEqualTo(individual2);
        individual2.setId("id2");
        assertThat(individual1).isNotEqualTo(individual2);
        individual1.setId(null);
        assertThat(individual1).isNotEqualTo(individual2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IndividualDTO.class);
        IndividualDTO individualDTO1 = new IndividualDTO();
        individualDTO1.setId("id1");
        IndividualDTO individualDTO2 = new IndividualDTO();
        assertThat(individualDTO1).isNotEqualTo(individualDTO2);
        individualDTO2.setId(individualDTO1.getId());
        assertThat(individualDTO1).isEqualTo(individualDTO2);
        individualDTO2.setId("id2");
        assertThat(individualDTO1).isNotEqualTo(individualDTO2);
        individualDTO1.setId(null);
        assertThat(individualDTO1).isNotEqualTo(individualDTO2);
    }
}
