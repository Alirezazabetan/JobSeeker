package ir.zabetan.job.repository;

import ir.zabetan.job.domain.TestScore;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TestScore entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TestScoreRepository extends MongoRepository<TestScore, String> {

}
