package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Accomplishment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Accomplishment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccomplishmentRepository extends MongoRepository<Accomplishment, String> {

}
