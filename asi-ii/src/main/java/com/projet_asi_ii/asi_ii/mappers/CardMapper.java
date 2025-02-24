package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.entities.CardEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = CollectionMapper.class)
public interface CardMapper {

    CardMapper INSTANCE = Mappers.getMapper( CardMapper.class );

    @Mapping(source = "collection", target = "collectionEntity")
    CardEntity toCardEntity(CardDto cardDto);

    @Mapping(source = "collectionEntity", target = "collection")
    CardDto toCardDto(CardEntity cardEntity);
}