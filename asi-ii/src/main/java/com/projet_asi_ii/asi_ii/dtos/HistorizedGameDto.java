package com.projet_asi_ii.asi_ii.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistorizedGameDto {

    private Long id;
    private String playerOne;
    private String playerTwo;
    private String roomName;
    private int elapsedTurn;
    private Date gameDate;
    private String uuid;
}
