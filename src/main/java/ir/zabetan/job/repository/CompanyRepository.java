package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {

}
