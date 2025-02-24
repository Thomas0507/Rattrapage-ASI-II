package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.mappers.CardMapper;
import com.projet_asi_ii.asi_ii.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    CardService cardService;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<CardDto>> getCards() {
        return ResponseEntity.ok(this.cardService.getCards());
    }

    @GetMapping("{cardId}")
    public ResponseEntity<CardDto> getCardById(@PathVariable(value = "cardId") String cardId) {
        long id = Long.parseLong(cardId);
        return ResponseEntity.ok(this.cardService.getCardById(id));
    }
    @PostMapping
    public ResponseEntity<Boolean> createCard(@RequestBody List<CardDto> cardsDto) {
        return ResponseEntity.ok(this.cardService.insertCards(cardsDto));
    }
}
