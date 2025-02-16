package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    CardService cardService;

    @GetMapping(name = "/getAll", produces = "application/json")
    public ResponseEntity<List<CardDto>> getCards() {
        return ResponseEntity.ok(this.cardService.getCards());
    }
}
