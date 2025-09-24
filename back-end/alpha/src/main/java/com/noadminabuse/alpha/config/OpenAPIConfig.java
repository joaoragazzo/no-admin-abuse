package com.noadminabuse.alpha.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenAPIConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("NoAdminAbuse API")
                .version("1.0")
                .description("API da plataforma de servidores de DayZ")
            );
    }

    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("admin")
                .displayName("🛡️ Administração")
                .pathsToMatch("/admin/**")
                .build();
    }
    
    @Bean  
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .displayName("🌐 Público")
                .pathsToExclude("/admin/**")
                .build();
    }
}
