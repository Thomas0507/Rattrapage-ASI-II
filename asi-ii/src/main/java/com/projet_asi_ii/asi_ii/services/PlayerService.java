package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.mappers.PlayerMapper;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;


    public PlayerDto getPlayerDetails(String username) {
        return PlayerMapper.INSTANCE.toPlayerDto(playerRepository.findByUserUsername(username));
    }
}
