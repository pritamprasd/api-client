package com.pritamprasad.test.server.model;

import lombok.Data;

import java.util.UUID;

@Data
public class ResponseData {
    private UUID id = UUID.randomUUID();
    private String data;
}
