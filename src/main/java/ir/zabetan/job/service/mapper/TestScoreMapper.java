package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.TestScoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TestScore and its DTO TestScoreDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TestScoreMapper extends EntityMapper<TestScoreDTO, TestScore> {


}
