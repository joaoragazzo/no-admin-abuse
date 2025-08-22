package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.config.client.BattleMetricsClient;
import com.noadminabuse.alpha.config.client.dto.battlemetrics.BattleMetricsResponse;
import com.noadminabuse.alpha.scrapping.BattleMetricsScrapper;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
public class DebugController {

    private final BattleMetricsScrapper battleMetricsScrapper;

    @GetMapping("/ping")
    public ResponseEntity<String> getMethodName() {
        return ResponseEntity.ok().body("pong");
    }

    @GetMapping("/bm")
    public ResponseEntity<?> bmTest(@PathParam("size") Integer size) {
        battleMetricsScrapper.run();
        return ResponseEntity.ok().body(null);
    }
    
    
}
