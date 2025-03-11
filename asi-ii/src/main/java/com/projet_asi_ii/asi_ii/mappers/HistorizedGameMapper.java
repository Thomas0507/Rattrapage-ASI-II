package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.HistorizedGameDto;
import com.projet_asi_ii.asi_ii.entities.HistorizedGameEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HistorizedGameMapper {
    HistorizedGameMapper INSTANCE = Mappers.getMapper( HistorizedGameMapper.class );
    HistorizedGameEntity toHistorizedGameEntity(HistorizedGameDto historizedGameDto);
    HistorizedGameDto toHistorizedGameDto(HistorizedGameEntity historizedGameEntity);
}
