package com.noadminabuse.alpha.service;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.repository.ServerRepository;
import com.noadminabuse.alpha.web.dto.ServersStatisticsDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServerService {
    private final ServerRepository serverRepository;

}
