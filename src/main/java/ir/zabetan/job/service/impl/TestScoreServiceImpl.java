package ir.zabetan.job.service.impl;

import ir.zabetan.job.service.TestScoreService;
import ir.zabetan.job.domain.TestScore;
import ir.zabetan.job.repository.TestScoreRepository;
import ir.zabetan.job.service.dto.TestScoreDTO;
import ir.zabetan.job.service.mapper.TestScoreMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing TestScore.
 */
@Service
public class TestScoreServiceImpl implements TestScoreService {

    private final Logger log = LoggerFactory.getLogger(TestScoreServiceImpl.class);

    private final TestScoreRepository testScoreRepository;

    private final TestScoreMapper testScoreMapper;

    public TestScoreServiceImpl(TestScoreRepository testScoreRepository, TestScoreMapper testScoreMapper) {
        this.testScoreRepository = testScoreRepository;
        this.testScoreMapper = testScoreMapper;
    }

    /**
     * Save a testScore.
     *
     * @param testScoreDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TestScoreDTO save(TestScoreDTO testScoreDTO) {
        log.debug("Request to save TestScore : {}", testScoreDTO);
        TestScore testScore = testScoreMapper.toEntity(testScoreDTO);
        testScore = testScoreRepository.save(testScore);
        return testScoreMapper.toDto(testScore);
    }

    /**
     * Get all the testScores.
     *
     * @return the list of entities
     */
    @Override
    public List<TestScoreDTO> findAll() {
        log.debug("Request to get all TestScores");
        return testScoreRepository.findAll().stream()
            .map(testScoreMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one testScore by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<TestScoreDTO> findOne(String id) {
        log.debug("Request to get TestScore : {}", id);
        return testScoreRepository.findById(id)
            .map(testScoreMapper::toDto);
    }

    /**
     * Delete the testScore by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete TestScore : {}", id);
        testScoreRepository.deleteById(id);
    }
}
