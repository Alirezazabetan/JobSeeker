/*
package ir.zabetan.job.repository.impl;

import com.mongodb.BasicDBObject;
import ir.rashasoft.bss.product.domain.Like;
import ir.rashasoft.bss.product.domain.ProductOffering;
import ir.rashasoft.bss.product.repository.LikeCustomRepository;
import ir.rashasoft.bss.product.repository.LikeRepository;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;


import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Component
public class LikeRepositoryImpl implements LikeCustomRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    private LikeRepository likeRepository;

    private Criteria getIdCriteria(String id) {
        return where("_id").is(id);
    }

    public LikeRepositoryImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public String insertLike(Like like, String productOfferingId) {
        Validate.notNull(productOfferingId, "The given productOfferingId must not be null!");
        Like newLike = like;
        if (like == null){
            newLike = likeRepository.save(like);
        }

        Query query = query(getIdCriteria(productOfferingId));
        Update update = new Update().addToSet("likes", newLike);
        mongoOperations.updateFirst(query, update, ProductOffering.class);
        return like.getId();
    }

    @Override
    public void removeLike(String productOfferingId, String partyId) {
        Validate.notNull(partyId, "The given partyId must not be null!");
        Validate.notNull(productOfferingId, "The given productOfferingId.id must not be null!");
        partyId="AAAAA1";
        Query query = query(getIdCriteria(productOfferingId));
        Update update = new Update().pull("likes", new BasicDBObject("party", partyId));
        mongoOperations.updateFirst(query, update, ProductOffering.class);
    }
}
*/
