package com.pritamprasad.api_client.config;

import com.pritamprasad.api_client.exception.ApiClientException;
import com.pritamprasad.api_client.exception.InvalidRequestException;
import com.pritamprasad.api_client.model.ApiClientErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import static java.lang.String.format;

@ControllerAdvice(annotations = RestController.class)
public class ApiClientControllerAdvice {

    private Logger logger = LoggerFactory.getLogger(ApiClientControllerAdvice.class);

    @ExceptionHandler(value = ApiClientException.class)
    public ResponseEntity<ApiClientErrorResponse> handleApiClientException(final ApiClientException e){
        ApiClientErrorResponse apiClientErrorResponse = ApiClientErrorResponse.builder()
                .build();
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        if(e instanceof InvalidRequestException) {
            logger.error(format("%s exception occurred. message: %s", e.getExceptionClass(), e.getInnerExceptionMessage()));
        }
        return new ResponseEntity<>(apiClientErrorResponse,httpStatus);
    }
}
