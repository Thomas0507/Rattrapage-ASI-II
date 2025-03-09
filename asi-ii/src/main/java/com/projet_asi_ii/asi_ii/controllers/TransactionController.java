package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.Exceptions.CardNotFoundException;
import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.entities.UserEntity;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import com.projet_asi_ii.asi_ii.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.projet_asi_ii.asi_ii.services.security.JwtService;


import java.util.List;

@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @Autowired
	private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getTransaction(@RequestParam String username) {

        return ResponseEntity.ok(this.transactionService.getTransactionByUsername(username));
    }

    @PostMapping
    public ResponseEntity<TransactionDto> createTransaction(@RequestBody TransactionRequest transactionRequest) throws CardNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity uE = (UserEntity) authentication.getPrincipal();
        transactionRequest.setUsername(uE.getUsername());

        return ResponseEntity.ok(this.transactionService.createTransaction(transactionRequest));
    }   

}
