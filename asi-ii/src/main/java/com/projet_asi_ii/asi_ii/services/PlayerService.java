package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.Exceptions.PlayerNotFoundException;
import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.dtos.PlayerSimplifiedDto;
import com.projet_asi_ii.asi_ii.entities.PlayerEntity;
import com.projet_asi_ii.asi_ii.mappers.PlayerMapper;
import com.projet_asi_ii.asi_ii.repositories.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;


    public PlayerDto getPlayerDetails(String username) {
        return PlayerMapper.INSTANCE.toPlayerDto(playerRepository.findByUserUsername(username));
    }

    public List<PlayerSimplifiedDto> getPlayers() {
        List<PlayerEntity> playersEntity = playerRepository.findAll();
        List <PlayerSimplifiedDto> playerSimplifiedDtos = new ArrayList<>();
        for (PlayerEntity playerEntity : playersEntity) {
            playerSimplifiedDtos.add(new PlayerSimplifiedDto(playerEntity.getUser().getUsername()));
        }
        return playerSimplifiedDtos;
    }

    public PlayerDto getPlayerCash(String username) throws PlayerNotFoundException {
        PlayerEntity playerEntity = playerRepository.findByUserUsername(username);
        if (playerEntity == null) {
            throw new PlayerNotFoundException("Could not find player", "Player username: " + username);
        }
        PlayerDto pd =  new PlayerDto();
        pd.setCash(playerEntity.getCash());
        pd.setUsername(playerEntity.getUser().getUsername());
        return pd;
    }
}
