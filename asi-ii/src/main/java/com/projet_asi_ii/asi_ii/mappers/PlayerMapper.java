package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PlayerMapper
{
    PlayerMapper INSTANCE = Mappers.getMapper( PlayerMapper.class );

    PlayerEntity toPlayerEntity(PlayerDto playerDto);

    @Mapping(target = "username", expression = "java(playerEntity.getUser().getUsername())")
    PlayerDto toPlayerDto(PlayerEntity playerEntity);
}
