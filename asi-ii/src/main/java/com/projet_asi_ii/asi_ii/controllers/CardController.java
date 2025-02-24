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
    public ResponseEntity<List<CardDto>> getCards(@RequestParam(value = "page", required = false)String page, @RequestParam(value = "size", required = false)String size) {
        int pageNumber = 0;
        int pageSize = 10;
        if (page != null) {
            pageNumber = Integer.parseInt(page);
        }
        if (size != null) {
            pageSize = Integer.parseInt(size);
        }
        return ResponseEntity.ok(this.cardService.getCardsWithRange(pageNumber, pageSize));
    }

    @GetMapping("{cardId}")
    public ResponseEntity<CardDto> getCardById(@PathVariable(value = "cardId") String cardId) {
        long id = Long.parseLong(cardId);
        return ResponseEntity.ok(this.cardService.getCardById(id));
    }

    @GetMapping("/getNbCards")
    public ResponseEntity<Integer> getNbCards() {
        return ResponseEntity.ok(this.cardService.getNbCards());
    }
    @PostMapping
    public ResponseEntity<Boolean> createCard(@RequestBody List<CardDto> cardsDto) {
        return ResponseEntity.ok(this.cardService.insertCards(cardsDto));
    }
}
