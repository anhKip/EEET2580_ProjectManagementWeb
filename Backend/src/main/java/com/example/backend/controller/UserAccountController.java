package com.example.backend.controller;

import com.example.backend.model.UserAccount;
import com.example.backend.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserAccountController {
    @Autowired
    private CrudService<UserAccount> userAccountCrudService;

    @PostMapping(value = "/", consumes = "application/json")
    public UserAccount create(@RequestBody UserAccount userAccount) {
        return userAccountCrudService.create(userAccount);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public UserAccount retrieve(@PathVariable Long id) {
        return userAccountCrudService.retrieve(id);
    }

    @PutMapping(value = "/", consumes = "application/json")
    public UserAccount update(@RequestBody UserAccount userAccount) {
        return userAccountCrudService.update(userAccount);
    }

    @DeleteMapping(value = "/")
    public String delete(Long id) {
        userAccountCrudService.delete(id);
        return "Done";
    }
}
