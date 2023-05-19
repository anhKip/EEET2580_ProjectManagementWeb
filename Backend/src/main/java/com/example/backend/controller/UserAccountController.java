package com.example.backend.controller;

import com.example.backend.model.UserAccount;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.record.UpdateUserRequest;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;
    @Autowired
    private UserAccountRepository userAccountRepository;

//    @PostMapping(value = "/", consumes = "application/json")
//    public UserAccount create(@RequestBody UserAccount userAccount) {
//        return userAccountService.create(userAccount);
//    }
//
//    @GetMapping(value = "/{id}", produces = "application/json")
//    public UserAccount retrieve(@PathVariable Long id) {
//        return userAccountService.retrieve(id);
//    }

    @Operation(description = "Update user account info")
    @PutMapping(value = "/{userId}/update", consumes = "application/json")
    public ResponseEntity<String> update(@PathVariable Long userId, @RequestBody @Valid UpdateUserRequest request) {
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
