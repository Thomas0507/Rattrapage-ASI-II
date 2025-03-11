package com.projet_asi_ii.asi_ii.repositories;

import com.projet_asi_ii.asi_ii.entities.HistorizedGameEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HistorizedGameRepository extends JpaRepository<HistorizedGameEntity, Long> {

    public List<HistorizedGameEntity> findByPlayerOne(String playerOne);
    public List<HistorizedGameEntity> findByPlayerTwo(String playerTwo);
    Optional<HistorizedGameEntity> findByPlayerOneAndPlayerTwoAndUuid(String playerOne, String playerTwo, String uuid);
}
