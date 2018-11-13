package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.Company;
import ir.zabetan.job.repository.CompanyRepository;
import ir.zabetan.job.service.CompanyService;
import ir.zabetan.job.service.dto.CompanyDTO;
import ir.zabetan.job.service.mapper.CompanyMapper;
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
 * Test class for the CompanyResource REST controller.
 *
 * @see CompanyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class CompanyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_WORK_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_WORK_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_WORK_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final Long DEFAULT_TEL = 1L;
    private static final Long UPDATED_TEL = 2L;

    private static final String DEFAULT_EMPLOYER_RANGE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYER_RANGE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ABOUT = "AAAAAAAAAA";
    private static final String UPDATED_ABOUT = "BBBBBBBBBB";

    private static final String DEFAULT_SOCIAL_NETWORKS = "AAAAAAAAAA";
    private static final String UPDATED_SOCIAL_NETWORKS = "BBBBBBBBBB";

    private static final String DEFAULT_VACANCIES = "AAAAAAAAAA";
    private static final String UPDATED_VACANCIES = "BBBBBBBBBB";

    @Autowired
    private CompanyRepository companyRepository;


    @Autowired
    private CompanyMapper companyMapper;
    

    @Autowired
    private CompanyService companyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCompanyMockMvc;

    private Company company;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyResource companyResource = new CompanyResource(companyService);
        this.restCompanyMockMvc = MockMvcBuilders.standaloneSetup(companyResource)
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
    public static Company createEntity() {
        Company company = new Company()
            .name(DEFAULT_NAME)
            .workTitle(DEFAULT_WORK_TITLE)
            .workDescription(DEFAULT_WORK_DESCRIPTION)
            .location(DEFAULT_LOCATION)
            .startDate(DEFAULT_START_DATE)
            .website(DEFAULT_WEBSITE)
            .tel(DEFAULT_TEL)
            .employerRange(DEFAULT_EMPLOYER_RANGE)
            .email(DEFAULT_EMAIL)
            .about(DEFAULT_ABOUT)
            .socialNetworks(DEFAULT_SOCIAL_NETWORKS)
            .vacancies(DEFAULT_VACANCIES);
        return company;
    }

    @Before
    public void initTest() {
        companyRepository.deleteAll();
        company = createEntity();
    }

    @Test
    public void createCompany() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company
        CompanyDTO companyDTO = companyMapper.toDto(company);
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyDTO)))
            .andExpect(status().isCreated());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate + 1);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCompany.getWorkTitle()).isEqualTo(DEFAULT_WORK_TITLE);
        assertThat(testCompany.getWorkDescription()).isEqualTo(DEFAULT_WORK_DESCRIPTION);
        assertThat(testCompany.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testCompany.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCompany.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testCompany.getTel()).isEqualTo(DEFAULT_TEL);
        assertThat(testCompany.getEmployerRange()).isEqualTo(DEFAULT_EMPLOYER_RANGE);
        assertThat(testCompany.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCompany.getAbout()).isEqualTo(DEFAULT_ABOUT);
        assertThat(testCompany.getSocialNetworks()).isEqualTo(DEFAULT_SOCIAL_NETWORKS);
        assertThat(testCompany.getVacancies()).isEqualTo(DEFAULT_VACANCIES);
    }

    @Test
    public void createCompanyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyRepository.findAll().size();

        // Create the Company with an existing ID
        company.setId("existing_id");
        CompanyDTO companyDTO = companyMapper.toDto(company);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyMockMvc.perform(post("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCompanies() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        // Get all the companyList
        restCompanyMockMvc.perform(get("/api/companies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(company.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].workTitle").value(hasItem(DEFAULT_WORK_TITLE.toString())))
            .andExpect(jsonPath("$.[*].workDescription").value(hasItem(DEFAULT_WORK_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].tel").value(hasItem(DEFAULT_TEL.intValue())))
            .andExpect(jsonPath("$.[*].employerRange").value(hasItem(DEFAULT_EMPLOYER_RANGE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].about").value(hasItem(DEFAULT_ABOUT.toString())))
            .andExpect(jsonPath("$.[*].socialNetworks").value(hasItem(DEFAULT_SOCIAL_NETWORKS.toString())))
            .andExpect(jsonPath("$.[*].vacancies").value(hasItem(DEFAULT_VACANCIES.toString())));
    }
    

    @Test
    public void getCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", company.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(company.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.workTitle").value(DEFAULT_WORK_TITLE.toString()))
            .andExpect(jsonPath("$.workDescription").value(DEFAULT_WORK_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.tel").value(DEFAULT_TEL.intValue()))
            .andExpect(jsonPath("$.employerRange").value(DEFAULT_EMPLOYER_RANGE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.about").value(DEFAULT_ABOUT.toString()))
            .andExpect(jsonPath("$.socialNetworks").value(DEFAULT_SOCIAL_NETWORKS.toString()))
            .andExpect(jsonPath("$.vacancies").value(DEFAULT_VACANCIES.toString()));
    }
    @Test
    public void getNonExistingCompany() throws Exception {
        // Get the company
        restCompanyMockMvc.perform(get("/api/companies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Update the company
        Company updatedCompany = companyRepository.findById(company.getId()).get();
        updatedCompany
            .name(UPDATED_NAME)
            .workTitle(UPDATED_WORK_TITLE)
            .workDescription(UPDATED_WORK_DESCRIPTION)
            .location(UPDATED_LOCATION)
            .startDate(UPDATED_START_DATE)
            .website(UPDATED_WEBSITE)
            .tel(UPDATED_TEL)
            .employerRange(UPDATED_EMPLOYER_RANGE)
            .email(UPDATED_EMAIL)
            .about(UPDATED_ABOUT)
            .socialNetworks(UPDATED_SOCIAL_NETWORKS)
            .vacancies(UPDATED_VACANCIES);
        CompanyDTO companyDTO = companyMapper.toDto(updatedCompany);

        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyDTO)))
            .andExpect(status().isOk());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
        Company testCompany = companyList.get(companyList.size() - 1);
        assertThat(testCompany.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCompany.getWorkTitle()).isEqualTo(UPDATED_WORK_TITLE);
        assertThat(testCompany.getWorkDescription()).isEqualTo(UPDATED_WORK_DESCRIPTION);
        assertThat(testCompany.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testCompany.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCompany.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testCompany.getTel()).isEqualTo(UPDATED_TEL);
        assertThat(testCompany.getEmployerRange()).isEqualTo(UPDATED_EMPLOYER_RANGE);
        assertThat(testCompany.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCompany.getAbout()).isEqualTo(UPDATED_ABOUT);
        assertThat(testCompany.getSocialNetworks()).isEqualTo(UPDATED_SOCIAL_NETWORKS);
        assertThat(testCompany.getVacancies()).isEqualTo(UPDATED_VACANCIES);
    }

    @Test
    public void updateNonExistingCompany() throws Exception {
        int databaseSizeBeforeUpdate = companyRepository.findAll().size();

        // Create the Company
        CompanyDTO companyDTO = companyMapper.toDto(company);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCompanyMockMvc.perform(put("/api/companies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Company in the database
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCompany() throws Exception {
        // Initialize the database
        companyRepository.save(company);

        int databaseSizeBeforeDelete = companyRepository.findAll().size();

        // Get the company
        restCompanyMockMvc.perform(delete("/api/companies/{id}", company.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Company> companyList = companyRepository.findAll();
        assertThat(companyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Company.class);
        Company company1 = new Company();
        company1.setId("id1");
        Company company2 = new Company();
        company2.setId(company1.getId());
        assertThat(company1).isEqualTo(company2);
        company2.setId("id2");
        assertThat(company1).isNotEqualTo(company2);
        company1.setId(null);
        assertThat(company1).isNotEqualTo(company2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyDTO.class);
        CompanyDTO companyDTO1 = new CompanyDTO();
        companyDTO1.setId("id1");
        CompanyDTO companyDTO2 = new CompanyDTO();
        assertThat(companyDTO1).isNotEqualTo(companyDTO2);
        companyDTO2.setId(companyDTO1.getId());
        assertThat(companyDTO1).isEqualTo(companyDTO2);
        companyDTO2.setId("id2");
        assertThat(companyDTO1).isNotEqualTo(companyDTO2);
        companyDTO1.setId(null);
        assertThat(companyDTO1).isNotEqualTo(companyDTO2);
    }
}
