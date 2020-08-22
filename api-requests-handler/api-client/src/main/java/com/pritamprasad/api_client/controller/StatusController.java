package com.pritamprasad.api_client.controller;

import com.pritamprasad.api_client.model.CustomStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class StatusController {

    @GetMapping
    public CustomStatus getStatus(){
        return CustomStatus.builder().status("UP").build();
    }
}
