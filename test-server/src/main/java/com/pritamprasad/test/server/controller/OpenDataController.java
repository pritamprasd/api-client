package com.pritamprasad.test.server.controller;

import com.pritamprasad.test.server.model.ResponseData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data")
public class OpenDataController {

    @GetMapping
    public ResponseEntity<ResponseData> getRandomData(){
        ResponseData responseData = new ResponseData();

        return ResponseEntity.ok(responseData);
    }
}
