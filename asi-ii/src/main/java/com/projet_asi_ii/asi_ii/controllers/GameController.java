package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.HistorizedGameDto;
import com.projet_asi_ii.asi_ii.requests.HistorizedGameRequest;
import com.projet_asi_ii.asi_ii.services.HistorizedGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("game")
public class GameController {

    @Autowired
    private HistorizedGameService historizedGameService;

    @PostMapping("/saveGame")
    public ResponseEntity<HistorizedGameDto> saveGame(@RequestBody HistorizedGameRequest request) {
        return ResponseEntity.ok(this.historizedGameService.saveGame(request));
    };

}
