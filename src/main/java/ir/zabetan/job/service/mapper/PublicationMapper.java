package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.PublicationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Publication and its DTO PublicationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PublicationMapper extends EntityMapper<PublicationDTO, Publication> {


}
