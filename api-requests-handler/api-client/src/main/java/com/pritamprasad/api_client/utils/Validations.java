package com.pritamprasad.api_client.utils;

import com.pritamprasad.api_client.exception.InvalidRequestException;
import com.pritamprasad.api_client.model.ApiRequest;

public class Validations {

    private Validations(){}

    public static void validateRequest(ApiRequest request) throws InvalidRequestException {
        //TODO
    }

    public static ApiRequest sanitizeRequest(ApiRequest request) {
        return request;
    }
}
