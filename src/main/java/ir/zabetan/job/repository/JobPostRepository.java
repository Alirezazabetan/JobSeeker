package ir.zabetan.job.repository;

import ir.zabetan.job.domain.JobPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the JobPost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobPostRepository extends MongoRepository<JobPost, String> {

}
