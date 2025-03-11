package com.projet_asi_ii.asi_ii.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "HistorizedGame")
public class HistorizedGameEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String playerOne;
    private String playerTwo;
    private String roomName;
    private int elapsedTurn;
    @CreationTimestamp
    @Column(updatable = false)
    private Date gameDate;
    private String uuid;
}
