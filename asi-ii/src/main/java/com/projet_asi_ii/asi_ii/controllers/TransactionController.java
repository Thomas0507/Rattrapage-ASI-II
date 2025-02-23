package com.projet_asi_ii.asi_ii.controllers;

import com.projet_asi_ii.asi_ii.dtos.TransactionDto;
import com.projet_asi_ii.asi_ii.requests.TransactionRequest;
import com.projet_asi_ii.asi_ii.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDto>> getTransaction(@RequestParam String username) {

        return ResponseEntity.ok(this.transactionService.getTransactionByUsername(username));
    }

    @PostMapping
    public ResponseEntity<TransactionDto> createTransaction(@RequestBody TransactionRequest transactionRequest) {
        return ResponseEntity.ok(this.transactionService.createTransaction(transactionRequest));
    }
}
