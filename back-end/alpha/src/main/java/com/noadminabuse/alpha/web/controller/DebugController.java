package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
public class DebugController {

    @GetMapping("/ping")
    public ResponseEntity<String> getMethodName() {
        return ResponseEntity.ok().body("pong");
    }
    
}
