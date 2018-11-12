package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.PatentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Patent and its DTO PatentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PatentMapper extends EntityMapper<PatentDTO, Patent> {


}
