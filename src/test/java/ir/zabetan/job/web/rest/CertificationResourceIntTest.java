package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.Certification;
import ir.zabetan.job.repository.CertificationRepository;
import ir.zabetan.job.service.CertificationService;
import ir.zabetan.job.service.dto.CertificationDTO;
import ir.zabetan.job.service.mapper.CertificationMapper;
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
 * Test class for the CertificationResource REST controller.
 *
 * @see CertificationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class CertificationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CERTIFICATION_AUTHORITY = "AAAAAAAAAA";
    private static final String UPDATED_CERTIFICATION_AUTHORITY = "BBBBBBBBBB";

    private static final String DEFAULT_LICENSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_LICENSE_NUMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CertificationRepository certificationRepository;


    @Autowired
    private CertificationMapper certificationMapper;
    

    @Autowired
    private CertificationService certificationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restCertificationMockMvc;

    private Certification certification;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CertificationResource certificationResource = new CertificationResource(certificationService);
        this.restCertificationMockMvc = MockMvcBuilders.standaloneSetup(certificationResource)
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
    public static Certification createEntity() {
        Certification certification = new Certification()
            .name(DEFAULT_NAME)
            .certificationAuthority(DEFAULT_CERTIFICATION_AUTHORITY)
            .licenseNumber(DEFAULT_LICENSE_NUMBER)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return certification;
    }

    @Before
    public void initTest() {
        certificationRepository.deleteAll();
        certification = createEntity();
    }

    @Test
    public void createCertification() throws Exception {
        int databaseSizeBeforeCreate = certificationRepository.findAll().size();

        // Create the Certification
        CertificationDTO certificationDTO = certificationMapper.toDto(certification);
        restCertificationMockMvc.perform(post("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificationDTO)))
            .andExpect(status().isCreated());

        // Validate the Certification in the database
        List<Certification> certificationList = certificationRepository.findAll();
        assertThat(certificationList).hasSize(databaseSizeBeforeCreate + 1);
        Certification testCertification = certificationList.get(certificationList.size() - 1);
        assertThat(testCertification.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCertification.getCertificationAuthority()).isEqualTo(DEFAULT_CERTIFICATION_AUTHORITY);
        assertThat(testCertification.getLicenseNumber()).isEqualTo(DEFAULT_LICENSE_NUMBER);
        assertThat(testCertification.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCertification.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createCertificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = certificationRepository.findAll().size();

        // Create the Certification with an existing ID
        certification.setId("existing_id");
        CertificationDTO certificationDTO = certificationMapper.toDto(certification);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCertificationMockMvc.perform(post("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Certification in the database
        List<Certification> certificationList = certificationRepository.findAll();
        assertThat(certificationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllCertifications() throws Exception {
        // Initialize the database
        certificationRepository.save(certification);

        // Get all the certificationList
        restCertificationMockMvc.perform(get("/api/certifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(certification.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].certificationAuthority").value(hasItem(DEFAULT_CERTIFICATION_AUTHORITY.toString())))
            .andExpect(jsonPath("$.[*].licenseNumber").value(hasItem(DEFAULT_LICENSE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    

    @Test
    public void getCertification() throws Exception {
        // Initialize the database
        certificationRepository.save(certification);

        // Get the certification
        restCertificationMockMvc.perform(get("/api/certifications/{id}", certification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(certification.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.certificationAuthority").value(DEFAULT_CERTIFICATION_AUTHORITY.toString()))
            .andExpect(jsonPath("$.licenseNumber").value(DEFAULT_LICENSE_NUMBER.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }
    @Test
    public void getNonExistingCertification() throws Exception {
        // Get the certification
        restCertificationMockMvc.perform(get("/api/certifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCertification() throws Exception {
        // Initialize the database
        certificationRepository.save(certification);

        int databaseSizeBeforeUpdate = certificationRepository.findAll().size();

        // Update the certification
        Certification updatedCertification = certificationRepository.findById(certification.getId()).get();
        updatedCertification
            .name(UPDATED_NAME)
            .certificationAuthority(UPDATED_CERTIFICATION_AUTHORITY)
            .licenseNumber(UPDATED_LICENSE_NUMBER)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        CertificationDTO certificationDTO = certificationMapper.toDto(updatedCertification);

        restCertificationMockMvc.perform(put("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificationDTO)))
            .andExpect(status().isOk());

        // Validate the Certification in the database
        List<Certification> certificationList = certificationRepository.findAll();
        assertThat(certificationList).hasSize(databaseSizeBeforeUpdate);
        Certification testCertification = certificationList.get(certificationList.size() - 1);
        assertThat(testCertification.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCertification.getCertificationAuthority()).isEqualTo(UPDATED_CERTIFICATION_AUTHORITY);
        assertThat(testCertification.getLicenseNumber()).isEqualTo(UPDATED_LICENSE_NUMBER);
        assertThat(testCertification.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCertification.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingCertification() throws Exception {
        int databaseSizeBeforeUpdate = certificationRepository.findAll().size();

        // Create the Certification
        CertificationDTO certificationDTO = certificationMapper.toDto(certification);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCertificationMockMvc.perform(put("/api/certifications")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Certification in the database
        List<Certification> certificationList = certificationRepository.findAll();
        assertThat(certificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCertification() throws Exception {
        // Initialize the database
        certificationRepository.save(certification);

        int databaseSizeBeforeDelete = certificationRepository.findAll().size();

        // Get the certification
        restCertificationMockMvc.perform(delete("/api/certifications/{id}", certification.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Certification> certificationList = certificationRepository.findAll();
        assertThat(certificationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Certification.class);
        Certification certification1 = new Certification();
        certification1.setId("id1");
        Certification certification2 = new Certification();
        certification2.setId(certification1.getId());
        assertThat(certification1).isEqualTo(certification2);
        certification2.setId("id2");
        assertThat(certification1).isNotEqualTo(certification2);
        certification1.setId(null);
        assertThat(certification1).isNotEqualTo(certification2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CertificationDTO.class);
        CertificationDTO certificationDTO1 = new CertificationDTO();
        certificationDTO1.setId("id1");
        CertificationDTO certificationDTO2 = new CertificationDTO();
        assertThat(certificationDTO1).isNotEqualTo(certificationDTO2);
        certificationDTO2.setId(certificationDTO1.getId());
        assertThat(certificationDTO1).isEqualTo(certificationDTO2);
        certificationDTO2.setId("id2");
        assertThat(certificationDTO1).isNotEqualTo(certificationDTO2);
        certificationDTO1.setId(null);
        assertThat(certificationDTO1).isNotEqualTo(certificationDTO2);
    }
}
