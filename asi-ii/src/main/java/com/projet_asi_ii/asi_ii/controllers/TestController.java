package com.projet_asi_ii.asi_ii.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("test")
@RestController
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<String>testFunction() {
        return ResponseEntity.ok("test");
    }
}
