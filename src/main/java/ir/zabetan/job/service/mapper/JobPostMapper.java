package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.JobPostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobPost and its DTO JobPostDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface JobPostMapper extends EntityMapper<JobPostDTO, JobPost> {


}
