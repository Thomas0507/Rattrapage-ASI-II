package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.BannerDto;
import com.projet_asi_ii.asi_ii.dtos.CollectionDto;
import com.projet_asi_ii.asi_ii.entities.BannerEntity;
import com.projet_asi_ii.asi_ii.entities.CollectionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BannerMapper {
    BannerMapper INSTANCE = Mappers.getMapper(BannerMapper.class);

    BannerDto toDto(BannerEntity bannerEntity);
    BannerEntity toEntity(BannerDto bannerDto);
}
