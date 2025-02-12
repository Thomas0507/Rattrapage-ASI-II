package com.projet_asi_ii.asi_ii.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<String>testFunction() {
        return ResponseEntity.ok("test");
    }
}
