package com.example.backend.controller;

import com.example.backend.record.GetProjectRespone;
import com.example.backend.record.UserRequest;
import com.example.backend.service.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;

    @Operation(description = "Get user info")
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<UserRequest> retrieve(@PathVariable Long id) {
        return new ResponseEntity<>(userAccountService.getUser(id), HttpStatus.OK);
    }

    @Operation(description = "Update user account info")
    @PutMapping(value = "/{userId}/update", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable Long userId, @RequestBody @Valid UserRequest request) {
        return new ResponseEntity<>(userAccountService.updateUser(userId, request), HttpStatus.OK);
    }

//    @DeleteMapping(value = "/{id}")
//    public String delete(@PathVariable Long id) {
//        userAccountService.delete(id);
//        return "Done";
//    }

    @Operation(description = "Get all projects that the user has")
    @GetMapping(value = "/{userId}/my-projects", produces = "application/json")
    public ResponseEntity<List<GetProjectRespone>> getAllProjects(@PathVariable Long userId) {
        return new ResponseEntity<>(userAccountService.getAllProjects(userId), HttpStatus.OK);
    }
}
