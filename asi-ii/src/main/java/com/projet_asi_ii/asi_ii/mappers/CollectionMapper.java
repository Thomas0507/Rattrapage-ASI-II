package com.projet_asi_ii.asi_ii.mappers;


import com.projet_asi_ii.asi_ii.dtos.CollectionDto;
import com.projet_asi_ii.asi_ii.entities.CollectionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CollectionMapper {

    CollectionMapper INSTANCE = Mappers.getMapper(CollectionMapper.class);

    CollectionDto toDto(CollectionEntity collection);
    CollectionEntity toEntity(CollectionDto dto);

}
