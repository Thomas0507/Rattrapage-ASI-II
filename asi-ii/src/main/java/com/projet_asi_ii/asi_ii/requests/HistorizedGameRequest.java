package com.projet_asi_ii.asi_ii.requests;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HistorizedGameRequest {
    private String playerOne;
    private String playerTwo;
    private String winner;
    private String roomName;
    private int elapsedTurn;
    private String uuid;
}
