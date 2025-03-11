package com.projet_asi_ii.asi_ii.services;

import com.projet_asi_ii.asi_ii.dtos.HistorizedGameDto;
import com.projet_asi_ii.asi_ii.entities.HistorizedGameEntity;
import com.projet_asi_ii.asi_ii.mappers.HistorizedGameMapper;
import com.projet_asi_ii.asi_ii.repositories.HistorizedGameRepository;
import com.projet_asi_ii.asi_ii.requests.HistorizedGameRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HistorizedGameService {

    @Autowired
    private HistorizedGameRepository historizedGameRepository;

    @Transactional
    public HistorizedGameDto saveGame(HistorizedGameRequest request) {
        HistorizedGameEntity entity = new HistorizedGameEntity();
        entity.setPlayerOne(request.getPlayerOne());
        entity.setPlayerTwo(request.getPlayerTwo());
        entity.setRoomName(request.getRoomName());
        entity.setElapsedTurn(request.getElapsedTurn());
        entity.setUuid(request.getUuid());
        // winner & loser will try to insert in db, if there already is one with same UUID & player one & two, block it
        Optional<HistorizedGameEntity> historizedGameEntity = this.historizedGameRepository.findByPlayerOneAndPlayerTwoAndUuid(request.getPlayerOne(), request.getPlayerTwo(), request.getUuid());
        if (historizedGameEntity.isEmpty()) {
            return HistorizedGameMapper.INSTANCE.toHistorizedGameDto(historizedGameRepository.save(entity));
        } else {
            return HistorizedGameMapper.INSTANCE.toHistorizedGameDto(historizedGameEntity.get());
        }
    }
}
