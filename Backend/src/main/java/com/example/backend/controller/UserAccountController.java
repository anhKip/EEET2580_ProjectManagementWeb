package com.example.backend.controller;

import com.example.backend.model.UserAccount;
import com.example.backend.record.GetProjectRespone;
import com.example.backend.repository.UserAccountRepository;
import com.example.backend.service.UserAccountService;
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
    @Autowired
    private UserAccountRepository userAccountRepository;

    @PostMapping(value = "/", consumes = "application/json")
    public UserAccount create(@RequestBody UserAccount userAccount) {
        return userAccountService.create(userAccount);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public UserAccount retrieve(@PathVariable Long id) {
        return userAccountService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public UserAccount update(@RequestBody UserAccount userAccount) {
        return userAccountService.update(userAccount);
    }

    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Long id) {
        userAccountService.delete(id);
        return "Done";
    }

    @GetMapping(value = "/{id}/my-projects", produces = "application/json")
    public ResponseEntity<?> getAllProjects(@PathVariable Long id) {
        if (userAccountRepository.existsById(id)) {
            return new ResponseEntity<>(userAccountService.getAllProjects(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("An error has occured.", HttpStatus.BAD_REQUEST);
    }
}
