package ir.zabetan.job.repository;

import ir.zabetan.job.domain.HonorAndReward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the HonorAndReward entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HonorAndRewardRepository extends MongoRepository<HonorAndReward, String> {

}
