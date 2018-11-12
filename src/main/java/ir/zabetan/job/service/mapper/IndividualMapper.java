package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.IndividualDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Individual and its DTO IndividualDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IndividualMapper extends EntityMapper<IndividualDTO, Individual> {


}
