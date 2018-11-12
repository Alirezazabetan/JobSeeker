package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Patent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Patent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatentRepository extends MongoRepository<Patent, String> {

}
