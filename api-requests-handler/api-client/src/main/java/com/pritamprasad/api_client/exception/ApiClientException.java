package com.pritamprasad.api_client.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Exception only handles exception/error related data.
 * Error ResponseCode needs to be handled at  ControllerAdvice level
 * TODO:
 * 1. Exception vs Error vs RunTimeException
 * 2.
 *
 * @since : 0.0.1
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class ApiClientException extends Exception {

    /**
     * Defined in resources/config.yaml
     */
    private String exceptionId;

    private String innerExceptionMessage;

    private StackTraceElement[] stackTrace;

    @Setter
    private String exceptionClass;

}
