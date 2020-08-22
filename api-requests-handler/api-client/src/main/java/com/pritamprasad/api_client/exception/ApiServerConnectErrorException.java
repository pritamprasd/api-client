package com.pritamprasad.api_client.exception;

public class ApiServerConnectErrorException extends ApiClientException {

    public ApiServerConnectErrorException(String exceptionId, String innerExceptionMessage, StackTraceElement[] stackTrace) {
        super(exceptionId, innerExceptionMessage, stackTrace, ApiServerConnectErrorException.class.toString());
    }

    public ApiServerConnectErrorException() {
        super();
        this.setExceptionClass(ApiServerConnectErrorException.class.toString());
    }
}

