package com.example.backend.controller;

import com.example.backend.record.GetUpdateResponse;
import com.example.backend.service.UpdateService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/update")
public class UpdateController {
    @Autowired
    private UpdateService updateService;

    @Operation(description = "Get newest 7 updates of this project")
    @GetMapping(value = "/{projectId}", produces = "application/json")
    public ResponseEntity<List<GetUpdateResponse>> getUpdates(@PathVariable Long projectId) {
        return new ResponseEntity<>(updateService.getUpdates(projectId), HttpStatus.OK);
    }
}
