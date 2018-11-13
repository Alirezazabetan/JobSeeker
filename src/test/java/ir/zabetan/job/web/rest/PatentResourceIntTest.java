package ir.zabetan.job.web.rest;

import ir.zabetan.job.JobAngularApp;

import ir.zabetan.job.domain.Patent;
import ir.zabetan.job.repository.PatentRepository;
import ir.zabetan.job.service.PatentService;
import ir.zabetan.job.service.dto.PatentDTO;
import ir.zabetan.job.service.mapper.PatentMapper;
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
 * Test class for the PatentResource REST controller.
 *
 * @see PatentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JobAngularApp.class)
public class PatentResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_OFFICE = "AAAAAAAAAA";
    private static final String UPDATED_OFFICE = "BBBBBBBBBB";

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    private static final String DEFAULT_INVENTORY = "AAAAAAAAAA";
    private static final String UPDATED_INVENTORY = "BBBBBBBBBB";

    @Autowired
    private PatentRepository patentRepository;


    @Autowired
    private PatentMapper patentMapper;
    

    @Autowired
    private PatentService patentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPatentMockMvc;

    private Patent patent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatentResource patentResource = new PatentResource(patentService);
        this.restPatentMockMvc = MockMvcBuilders.standaloneSetup(patentResource)
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
    public static Patent createEntity() {
        Patent patent = new Patent()
            .title(DEFAULT_TITLE)
            .office(DEFAULT_OFFICE)
            .number(DEFAULT_NUMBER)
            .inventory(DEFAULT_INVENTORY);
        return patent;
    }

    @Before
    public void initTest() {
        patentRepository.deleteAll();
        patent = createEntity();
    }

    @Test
    public void createPatent() throws Exception {
        int databaseSizeBeforeCreate = patentRepository.findAll().size();

        // Create the Patent
        PatentDTO patentDTO = patentMapper.toDto(patent);
        restPatentMockMvc.perform(post("/api/patents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patentDTO)))
            .andExpect(status().isCreated());

        // Validate the Patent in the database
        List<Patent> patentList = patentRepository.findAll();
        assertThat(patentList).hasSize(databaseSizeBeforeCreate + 1);
        Patent testPatent = patentList.get(patentList.size() - 1);
        assertThat(testPatent.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testPatent.getOffice()).isEqualTo(DEFAULT_OFFICE);
        assertThat(testPatent.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testPatent.getInventory()).isEqualTo(DEFAULT_INVENTORY);
    }

    @Test
    public void createPatentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patentRepository.findAll().size();

        // Create the Patent with an existing ID
        patent.setId("existing_id");
        PatentDTO patentDTO = patentMapper.toDto(patent);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatentMockMvc.perform(post("/api/patents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Patent in the database
        List<Patent> patentList = patentRepository.findAll();
        assertThat(patentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllPatents() throws Exception {
        // Initialize the database
        patentRepository.save(patent);

        // Get all the patentList
        restPatentMockMvc.perform(get("/api/patents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patent.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].office").value(hasItem(DEFAULT_OFFICE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].inventory").value(hasItem(DEFAULT_INVENTORY.toString())));
    }
    

    @Test
    public void getPatent() throws Exception {
        // Initialize the database
        patentRepository.save(patent);

        // Get the patent
        restPatentMockMvc.perform(get("/api/patents/{id}", patent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patent.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.office").value(DEFAULT_OFFICE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.inventory").value(DEFAULT_INVENTORY.toString()));
    }
    @Test
    public void getNonExistingPatent() throws Exception {
        // Get the patent
        restPatentMockMvc.perform(get("/api/patents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePatent() throws Exception {
        // Initialize the database
        patentRepository.save(patent);

        int databaseSizeBeforeUpdate = patentRepository.findAll().size();

        // Update the patent
        Patent updatedPatent = patentRepository.findById(patent.getId()).get();
        updatedPatent
            .title(UPDATED_TITLE)
            .office(UPDATED_OFFICE)
            .number(UPDATED_NUMBER)
            .inventory(UPDATED_INVENTORY);
        PatentDTO patentDTO = patentMapper.toDto(updatedPatent);

        restPatentMockMvc.perform(put("/api/patents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patentDTO)))
            .andExpect(status().isOk());

        // Validate the Patent in the database
        List<Patent> patentList = patentRepository.findAll();
        assertThat(patentList).hasSize(databaseSizeBeforeUpdate);
        Patent testPatent = patentList.get(patentList.size() - 1);
        assertThat(testPatent.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testPatent.getOffice()).isEqualTo(UPDATED_OFFICE);
        assertThat(testPatent.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testPatent.getInventory()).isEqualTo(UPDATED_INVENTORY);
    }

    @Test
    public void updateNonExistingPatent() throws Exception {
        int databaseSizeBeforeUpdate = patentRepository.findAll().size();

        // Create the Patent
        PatentDTO patentDTO = patentMapper.toDto(patent);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPatentMockMvc.perform(put("/api/patents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Patent in the database
        List<Patent> patentList = patentRepository.findAll();
        assertThat(patentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deletePatent() throws Exception {
        // Initialize the database
        patentRepository.save(patent);

        int databaseSizeBeforeDelete = patentRepository.findAll().size();

        // Get the patent
        restPatentMockMvc.perform(delete("/api/patents/{id}", patent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Patent> patentList = patentRepository.findAll();
        assertThat(patentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Patent.class);
        Patent patent1 = new Patent();
        patent1.setId("id1");
        Patent patent2 = new Patent();
        patent2.setId(patent1.getId());
        assertThat(patent1).isEqualTo(patent2);
        patent2.setId("id2");
        assertThat(patent1).isNotEqualTo(patent2);
        patent1.setId(null);
        assertThat(patent1).isNotEqualTo(patent2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PatentDTO.class);
        PatentDTO patentDTO1 = new PatentDTO();
        patentDTO1.setId("id1");
        PatentDTO patentDTO2 = new PatentDTO();
        assertThat(patentDTO1).isNotEqualTo(patentDTO2);
        patentDTO2.setId(patentDTO1.getId());
        assertThat(patentDTO1).isEqualTo(patentDTO2);
        patentDTO2.setId("id2");
        assertThat(patentDTO1).isNotEqualTo(patentDTO2);
        patentDTO1.setId(null);
        assertThat(patentDTO1).isNotEqualTo(patentDTO2);
    }
}
