package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.Exceptions.PlayerNotFoundException;
import com.projet_asi_ii.asi_ii.dtos.PlayerDto;
import com.projet_asi_ii.asi_ii.dtos.PlayerSimplifiedDto;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.requests.PlayerRequest;
import com.projet_asi_ii.asi_ii.services.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("player")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    // Get single user details
    @GetMapping
    public ResponseEntity<PlayerDto> playerByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity uE = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(this.playerService.getPlayerDetails(uE.getUsername()));
    }
    @GetMapping("/all")
    public ResponseEntity<List<PlayerSimplifiedDto>> getPlayers() {
        return ResponseEntity.ok(this.playerService.getPlayers());
    }
    @GetMapping("/cash")
    public ResponseEntity<PlayerDto> getCash() throws PlayerNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity uE = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(this.playerService.getPlayerCash(uE.getUsername()));
    }


}
