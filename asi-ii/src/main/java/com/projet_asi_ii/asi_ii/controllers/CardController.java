package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.Exceptions.CardNotFoundException;
import com.projet_asi_ii.asi_ii.Exceptions.NoBuyableCardsFoundException;
import com.projet_asi_ii.asi_ii.dtos.CardDto;
import com.projet_asi_ii.asi_ii.dtos.CollectionDto;
import com.projet_asi_ii.asi_ii.dtos.GenCardDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.enumerations.CardTypeEnum;
import com.projet_asi_ii.asi_ii.enumerations.TransactionTypeEnum;
import com.projet_asi_ii.asi_ii.requests.NotifRequest;
import com.projet_asi_ii.asi_ii.requests.PromptRequest;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import com.projet_asi_ii.asi_ii.services.CardService;
import com.projet_asi_ii.asi_ii.services.CollectionService;
import com.projet_asi_ii.asi_ii.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    CardService cardService;

    @Autowired
    CollectionService collectionService;

    @Autowired
    TransactionService transactionService;

    private static final String API_URL_ORCHESTRATOR = "http://orchestrator:8088/orchestrator/generateCard";
    private static final String API_URL_NODE = "http://nginx/ws/send-notification";

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

    @GetMapping("/buyableCards")
    public ResponseEntity<List<CardDto>> getBuyableCards() throws NoBuyableCardsFoundException {
        return ResponseEntity.ok(this.cardService.getBuyableCards());
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
    public ResponseEntity<List<CardDto>> createCard(@RequestBody List<CardDto> cardsDto) {
        return ResponseEntity.ok(this.cardService.insertCards(cardsDto));
    }

    @PostMapping("/generateCard")
    public ResponseEntity<String> generateCard(@RequestHeader("Authorization") String bearerToken, @RequestBody PromptRequest promptRequest) {
        System.out.println(promptRequest.toString());
        System.out.println(bearerToken);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(bearerToken.replace("Bearer ", ""));

        HttpEntity<PromptRequest> requestEntity = new HttpEntity<>(promptRequest, headers);

        String res = restTemplate.postForObject(API_URL_ORCHESTRATOR, requestEntity, String.class);
        return ResponseEntity.ok(res);
    }

    @CrossOrigin("http://localhost:8088")
    @PostMapping("/generateFromOrchestrator")
    public ResponseEntity<String> generateCardFromOrchestrator(@RequestBody GenCardDto genCardDto) throws CardNotFoundException {
        System.out.println(genCardDto.getImage());
        System.out.println(genCardDto.getPrompt());

        CollectionDto col = collectionService.getCollectionByName("AI");

        CardDto cardDto = new CardDto();
        cardDto.setName(genCardDto.getName());
        cardDto.setImage(genCardDto.getImage());
        cardDto.setDescription(genCardDto.getPrompt());
        cardDto.setCollection(col);
        cardDto.setAttack(100);
        cardDto.setDefense(100);
        cardDto.setHealth(100);
        cardDto.setDropRate(0);
        cardDto.setRarity(0);
        cardDto.setResellPrice(500);
        cardDto.setMainType(CardTypeEnum.NEUTRAL);

        List<CardDto> generatedCard = this.cardService.insertCards(List.of(cardDto));
        if (generatedCard != null && !generatedCard.isEmpty())
        {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity uE = (UserEntity) authentication.getPrincipal();
            TransactionRequest transactionRequest = new TransactionRequest(
                    uE.getUsername(), new HashSet<>(generatedCard),
                    TransactionTypeEnum.BUY, 0);
            transactionService.createTransaction(transactionRequest);

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            NotifRequest notifRequest = new NotifRequest(200, uE.getUsername(), "Card "+ genCardDto.getName() + " has been generated");
            HttpEntity<NotifRequest> requestEntity = new HttpEntity<>(notifRequest, headers);

            restTemplate.postForObject(API_URL_NODE, requestEntity, String.class);
        }

        return ResponseEntity.ok().build();
    }
}
