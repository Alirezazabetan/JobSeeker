package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Language;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Language entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanguageRepository extends MongoRepository<Language, String> {

}
