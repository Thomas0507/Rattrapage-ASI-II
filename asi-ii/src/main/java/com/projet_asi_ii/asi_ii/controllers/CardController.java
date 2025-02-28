package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.dtos.GenCardDto;
import com.projet_asi_ii.asi_ii.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

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

    @GetMapping("/generateCard")
    public ResponseEntity<String> generateCard(@RequestHeader("Authorization") String bearerToken) {
        final String uri = "http://orchestrator:8088/orchestrator/generateCard";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken.replace("Bearer ", ""));

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        return restTemplate.exchange(uri, HttpMethod.GET, requestEntity, String.class);
    }

    @CrossOrigin("http://localhost:8088")
    @PostMapping("/generateFromOrchestrator")
    public ResponseEntity<String> generateCardFromOrchestrator(@RequestBody GenCardDto genCardDto) {
        System.out.println(genCardDto.getImage());
        System.out.println(genCardDto.getPrompt());

        return ResponseEntity.ok().build();
    }
}
