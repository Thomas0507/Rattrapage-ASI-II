package com.projet_asi_ii.asi_ii.mappers;

import com.projet_asi_ii.asi_ii.dtos.UserDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper
{
	UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

	UserEntity toUserEntity(UserDto cardDto);
	UserDto toUserDto(UserEntity cardEntity);
}
