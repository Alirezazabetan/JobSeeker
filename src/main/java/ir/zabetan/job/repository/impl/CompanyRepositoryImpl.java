/*
package ir.zabetan.job.repository.impl;

import ir.zabetan.job.domain.Company;
import ir.zabetan.job.repository.CompanyCostumeRepository;
import ir.zabetan.job.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
public abstract class CompanyRepositoryImpl implements CompanyCostumeRepository {
    private final MongoOperations mongoOperations;

    @Autowired
    private CompanyRepository companyRepository;

    private Criteria getIdCriteria(String id) {
        return where("_id").is(id);
    }

    public CompanyRepositoryImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }


    @Override
    public List<String> getNames() {
        return null;
    }
}

*/
