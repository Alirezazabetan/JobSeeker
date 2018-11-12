package ir.zabetan.job.service.mapper;

import ir.zabetan.job.domain.*;
import ir.zabetan.job.service.dto.LanguageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Language and its DTO LanguageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LanguageMapper extends EntityMapper<LanguageDTO, Language> {


}
