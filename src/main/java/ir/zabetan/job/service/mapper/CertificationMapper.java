package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.CertificationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Certification and its DTO CertificationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CertificationMapper extends EntityMapper<CertificationDTO, Certification> {


}
