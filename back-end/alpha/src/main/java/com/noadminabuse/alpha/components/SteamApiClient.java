package com.noadminabuse.alpha.components;

import java.time.Duration;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.noadminabuse.alpha.errors.BadRequest;
import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;

import reactor.core.publisher.Mono;

@Component
public class SteamApiClient {
    @Value("${steam.api.key}")
    private String apiKey;
    
    @Value("${steam.api.base-url}")
    private String baseUrl;

    private final WebClient webClient;
    private static final Duration DEFAULT_TIMEOUT = Duration.ofSeconds(10);

    public SteamApiClient() {
        this.webClient = WebClient.builder()
            .baseUrl("https://api.steampowered.com/")
            .defaultHeader("Accept", "application/json")
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(2 * 1024 * 1024))
            .build();
    }

    /**
     * Verify if the openIdResponse is a legit response
     * 
     * @param openIdParams
     * @return 
     */
    public boolean isLegitOpenIdResponse(Map<String, String> openIdParams) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        openIdParams.forEach((key, value) -> {
            if (!key.equals("openid.mode"))
                formData.add(key, value);
        });

        formData.add("openid.mode", "check_authentication");

        String response = webClient.post()
            .uri("https://steamcommunity.com/openid/login")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(BodyInserters.fromFormData(formData))
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, 
                clientResponse -> Mono.error(new BadRequest(AuthErrorMessage.INVALID_STEAM_RESPONSE)))
            .onStatus(HttpStatusCode::is5xxServerError, 
                clientResponse -> Mono.error(new BadRequest(AuthErrorMessage.INVALID_STEAM_RESPONSE)))
            .bodyToMono(String.class)
            .timeout(DEFAULT_TIMEOUT)
            .block();

        return !Objects.isNull(response) && response.contains("is_valid:true");
    }   
}
