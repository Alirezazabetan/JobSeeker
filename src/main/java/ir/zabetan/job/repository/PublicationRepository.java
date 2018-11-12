package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Publication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Publication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PublicationRepository extends MongoRepository<Publication, String> {

}
