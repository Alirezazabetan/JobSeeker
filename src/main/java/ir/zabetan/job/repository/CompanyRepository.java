package ir.zabetan.job.repository;

import ir.zabetan.job.domain.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {

//    Optional<List<String>> getNames();
    @Query(value="{ name : ?0}", fields="{ name : 0 }")
    List<Company> getNames();
}
