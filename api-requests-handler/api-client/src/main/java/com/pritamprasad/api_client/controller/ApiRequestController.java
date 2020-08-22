package com.pritamprasad.api_client.controller;

import com.pritamprasad.api_client.exception.ApiClientException;
import com.pritamprasad.api_client.model.ApiRequest;
import com.pritamprasad.api_client.model.ApiResponse;
import com.pritamprasad.api_client.service.ApiRequestExecutorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.UUID;

import static com.pritamprasad.api_client.utils.Validations.sanitizeRequest;
import static com.pritamprasad.api_client.utils.Validations.validateRequest;
import static java.lang.String.format;
import static java.lang.System.currentTimeMillis;

@RestController
public class ApiRequestController {

    private Logger logger = LoggerFactory.getLogger(ApiRequestController.class);

    private ApiRequestExecutorService apiRequestExecutorService;

    @Autowired
    public ApiRequestController(ApiRequestExecutorService apiRequestExecutorService) {
        this.apiRequestExecutorService = apiRequestExecutorService;
    }

    @PostMapping(value = "/api",consumes = "application/json", produces = "application/json")
    public ResponseEntity<ApiResponse> executeApiRequest(@RequestBody ApiRequest request) throws ApiClientException {
        request.setId(UUID.randomUUID());
        logger.info(format("[Request ] timestamp: %s , request-id: %s , POST /api ",
                new Timestamp(currentTimeMillis()),request.getId().toString()));

        validateRequest(request);
        ApiResponse apiResponse = apiRequestExecutorService.executeRequest(sanitizeRequest(request));

        logger.info(format("[Response] timestamp: %s , request-id: %s , POST /api : %s",
                new Timestamp(currentTimeMillis()),request.getId().toString(),apiResponse.getStatusCode()));
        return ResponseEntity.ok(apiResponse);
    }



}
