package com.pritamprasad.api_client.exception;

public class InvalidRequestException extends ApiClientException {

    public InvalidRequestException(String exceptionId, String innerExceptionMessage, StackTraceElement[] stackTrace) {
        super(exceptionId, innerExceptionMessage, stackTrace, InvalidRequestException.class.toString());
    }

    public InvalidRequestException() {
        super();
        this.setExceptionClass(InvalidRequestException.class.toString());
    }
}

