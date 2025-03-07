package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.CollectionDto;
import com.projet_asi_ii.asi_ii.mappers.CollectionMapper;
import com.projet_asi_ii.asi_ii.mappers.PlayerMapper;
import com.projet_asi_ii.asi_ii.repositories.CardRepository;
import com.projet_asi_ii.asi_ii.repositories.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectionService {
    @Autowired
    private CollectionRepository collectionRepository;

    public CollectionDto getCollectionByName(String name){
        return CollectionMapper.INSTANCE.toDto(collectionRepository.findByName(name));
    }

}
