package com.noadminabuse.alpha.service;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.repository.ServerRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServerService {
    private final ServerRepository serverRepository;

}
