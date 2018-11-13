package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.HonorAndRewardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity HonorAndReward and its DTO HonorAndRewardDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HonorAndRewardMapper extends EntityMapper<HonorAndRewardDTO, HonorAndReward> {


}
