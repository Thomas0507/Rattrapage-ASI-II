package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.requests.PlayerRequest;
import com.projet_asi_ii.asi_ii.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // Get single user details
    @GetMapping
    public ResponseEntity<PlayerDto> playerByUsername(@RequestBody PlayerRequest playerRequest) {
        return ResponseEntity.ok(this.playerService.getPlayerDetails(playerRequest.getUsername().getFirst()));
    }

}
