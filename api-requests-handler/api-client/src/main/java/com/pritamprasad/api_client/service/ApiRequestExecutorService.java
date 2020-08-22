package com.pritamprasad.api_client.service;

import com.pritamprasad.api_client.exception.ApiClientException;
import com.pritamprasad.api_client.exception.ApiServerConnectErrorException;
import com.pritamprasad.api_client.model.AllowedHttpMethodTypes;
import com.pritamprasad.api_client.model.ApiRequest;
import com.pritamprasad.api_client.model.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;

import static java.lang.System.currentTimeMillis;

@Service
public class ApiRequestExecutorService {

    private RestTemplate restTemplate;

    private Logger logger = LoggerFactory.getLogger(ApiRequestExecutorService.class);

    @Autowired
    public ApiRequestExecutorService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApiResponse executeRequest(ApiRequest sanitizeRequest) throws ApiClientException {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setRequestId(sanitizeRequest.getId());
        apiResponse.setTimestamp(new Timestamp(currentTimeMillis()));
        try {
            if (sanitizeRequest.getMethod() == AllowedHttpMethodTypes.GET) {
                ResponseEntity<String> exchange = restTemplate.exchange(sanitizeRequest.getUrl(), HttpMethod.GET, null, String.class);
                apiResponse.setStatusCode(exchange.getStatusCode());
                if(exchange.getStatusCode() == HttpStatus.OK){
                    apiResponse.setResponseBody(exchange.getBody());
                }else{
                    logger.info("Non-OK status code: "+ exchange.getStatusCode());
                }
            } else {
                logger.info(" not get method: " + sanitizeRequest.toString());
            }
        } catch (RestClientException e){
            throw new ApiServerConnectErrorException("ex101",e.getMessage(),e.getStackTrace());
        }
        return apiResponse;
    }
}
