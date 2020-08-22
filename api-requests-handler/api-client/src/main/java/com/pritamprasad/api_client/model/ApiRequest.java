package com.pritamprasad.api_client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
public class ApiRequest {
    @Setter
    private UUID id;
    private AllowedHttpMethodTypes method;
    private String url;
}
