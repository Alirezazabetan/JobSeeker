package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.AccomplishmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Accomplishment and its DTO AccomplishmentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AccomplishmentMapper extends EntityMapper<AccomplishmentDTO, Accomplishment> {


}
