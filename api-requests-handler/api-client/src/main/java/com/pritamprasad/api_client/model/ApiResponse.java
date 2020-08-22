package com.pritamprasad.api_client.model;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.sql.Timestamp;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    @Setter
    private UUID requestId;

    @Setter
    private Timestamp timestamp;

    @Setter
    private HttpStatus statusCode;

    @Setter
    private String responseBody;
}
